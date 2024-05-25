import * as WebSocket from 'ws';
import {
  WebSocketAdapter,
  INestApplicationContext,
  Logger,
} from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { CLOSE_EVENT, CONNECTION_EVENT } from '@nestjs/websockets/constants';
import * as url from 'url';
import { jwtDecode } from 'jwt-decode';
import { get } from 'lodash';
import { IEvent } from '@tps/event.interface';

export class WsAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) {}

  private logger = new Logger('WsAdapter');
  private clientData = new Map<
    WebSocket,
    { server: any; listener: (...args: any[]) => void }
  >();

  create(
    port: number,
    options?: Record<string, any> & {
      namespace?: string;
      server?: any;
      path?: string;
    },
  ): any {
    const { server, path, ...wsOptions } = options;
    if (wsOptions?.namespace) {
      const error = new Error(
        '"WsAdapter" does not support namespaces. If you need namespaces in your project, consider using the "@nestjs/platform-socket.io" package instead.',
      );
      this.logger.error(error);
      throw error;
    }

    // if (server) {
    //   const origEmit = server.emit.bind(server);
    //   server.emit = (event: string, data: any) =>
    //     origEmit('event', event, data);
    //   return server;
    // }

    const wsServer = new WebSocket.Server({ port, ...options });

    // const origEmit = wsServer.emit.bind(wsServer);
    // wsServer.emit = (event: string, data: any) =>
    //   origEmit('event', event, data);
    return wsServer;
  }

  bindClientConnect(server: WebSocket, callback: Function) {
    server.on(CONNECTION_EVENT, (client: WebSocket, req: any) => {
      const queryData = url.parse(req.url, true).query;
      if (queryData?.type === 'admin') {
        if (!queryData?.token || typeof queryData?.token !== 'string') return;
        let decoded: any = undefined;
        try {
          // @ts-ignore
          decoded = jwtDecode(queryData.token);
        } catch (e) {
          this.logger.error(e);
        }

        if (!decoded?._id) return;
        const listener = (data: IEvent) =>
          client.send(JSON.stringify(data));
        server.on('event', listener);
        server.on(`event_${decoded?._id}`, listener);
        this.clientData.set(client, { server, listener });
        callback(client);
      } else if (queryData?.type === 'in-app') {
        // * for in-app react notification

        const apiKey = queryData?.apiKey;
        if (!apiKey || typeof apiKey !== 'string') return;

        const listener = (event: WebSocket, data) =>
          client.send(JSON.stringify({ event, data }));
        server.on('event', listener);
        server.on(`event_${apiKey}`, listener);
        this.clientData.set(client, { server, listener });
        callback(client);
      }
    });
  }

  bindClientDisconnect(client: any, callback: Function) {
    client.on(CLOSE_EVENT, () => {
      const data = this.clientData.get(client);
      if (data) {
        data.server.removeListener('event', data.listener);
        this.clientData.delete(client);
      }
      callback();
    });
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) => this.bindMessageHandler(data, handlers, process)),
        filter((result) => result),
      )
      .subscribe((response) => {
        try {
          client.send(JSON.stringify(response));
        } catch (e) {
          Logger.error(e.message);
          return EMPTY;
        }
      });
  }

  bindMessageHandler(
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    try {
      const message = JSON.parse(buffer.data);
      const messageHandler = handlers.find(
        (handler) => handler.message === message.event,
      );
      if (!messageHandler) {
        return EMPTY;
      }
      return process(messageHandler.callback(message.data));
    } catch (e) {
      Logger.error(e.message);
      return EMPTY;
    }
  }

  close(server) {
    server.close();
  }
}
