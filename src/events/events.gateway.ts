import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ISubscriberJwt } from '@libs/shared/entities/user';
import { JwtService } from '@nestjs/jwt';
import * as WebSocket from 'ws';

@WebSocketGateway(81, {
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: WebSocket;
  private logger = new Logger('EventsGateway');

  constructor(private jwtService: JwtService) {}

  @SubscribeMessage('send_message')
  handleEvent(
    @ConnectedSocket() client: WebSocket,
    @MessageBody()
    data: string,
  ): string {
    const payload = JSON.parse(data);
    this.logger.log(payload);
    this.server.to(payload.userId)?.emit('task', payload); // broadcast messages
    return payload;
  }

  async sendMessage(userId: string, event: string, data: any) {
    if (!this.server) {
      this.logger.error('No sw server available to send message');

      return;
    }

    this.logger.log(`Sending event ${event} message to ${userId}`);

    this.server.to(userId).emit(event, data);
  }

  // @SubscribeMessage('join_room')
  // async handleSetClientDataEvent(@ConnectedSocket() client: Socket) {
  // }

  async handleConnection(socket: WebSocket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
    await this.processConnectionRequest(socket);
  }

  async handleDisconnect(socket: WebSocket): Promise<void> {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  private extractToken(connection: WebSocket): string | undefined {
    return (
      connection.handshake?.auth?.token || connection.handshake?.query?.token
    );
  }

  private async getSubscriber(
    token: string,
  ): Promise<ISubscriberJwt | undefined> {
    let subscriber: ISubscriberJwt;

    try {
      subscriber = await this.jwtService.verify(token as string);
      if (subscriber.aud !== 'widget_user') {
        return;
      }

      return subscriber;
    } catch (e) {
      return;
    }
  }

  private async processConnectionRequest(connection: WebSocket) {
    const token = this.extractToken(connection);

    if (!token || token === 'null') {
      this.logger.warn(
        `No token was found during counnection process for ${connection.id}`,
      );

      // return this.disconnect(connection);
    }

    const subscriber = await this.getSubscriber(token);
    if (!subscriber) {
      this.logger.warn(
        `No subscriber was found for specified token ${connection.id}`,
      );

      return this.disconnect(connection);
    }

    this.logger.log(
      `Connection request received from ${subscriber._id} external id: ${subscriber.subscriberId}`,
    );

    await connection.join(subscriber._id);

    this.logger.log(`Connection request accepted for ${subscriber._id}`);
  }

  private disconnect(socket: WebSocket) {
    // socket.disconnect();
  }
}
