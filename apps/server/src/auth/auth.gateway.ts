import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../shared/interfaces/chat.interface';
import { ConnectionService } from '../ws-connections/connection.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server<ServerToClientEvents, ClientToServerEvents>;

  private logger = new Logger('ChatGateway');

  constructor(private connectionService: ConnectionService) {}

  async handleConnection(socket: Socket) {
    const token = socket.handshake.auth.token;

    if (!token) {
      this.logger.error(`No token provided ${socket.id}`);
      await this.connectionService.deleteBySocketId(socket.id);

      socket.disconnect();
    } else {
      this.logger.log(`Token provided ${socket.id}`);
      await this.connectionService.create({
        userId: token,
        socketId: socket.id,
      });
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
