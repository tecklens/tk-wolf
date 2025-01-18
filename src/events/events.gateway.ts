import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway(5001, {
  cors: {
    origin: ['*'],
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;
  private logger = new Logger('EventsGateway');

  constructor(private jwtService: JwtService) {}

  @SubscribeMessage('message')
  handleEvent(data: any): string {
    console.log(data);
    // this.server.emit(
    //   'event',
    //   JSON.stringify({ message: 'abc', event: 'event' }),
    // );
    return data;
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  async sendMessage<T>(props: {
    identifier: string;
    subscriberId: string;
    topic?: string;
    data: T;
  }) {
    this.server.emit(
      `event_${props.identifier}_${props.subscriberId}`,
      props.data,
    );
  }
}
