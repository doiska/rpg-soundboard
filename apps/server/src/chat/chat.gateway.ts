import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../shared/interfaces/chat.interface';
import { Logger } from '@nestjs/common';
import { ConnectionService } from '../ws-connections/connection.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server<ServerToClientEvents, ClientToServerEvents>;

  private logger = new Logger('ChatGateway');

  constructor(private connectionService: ConnectionService) {}

  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  async handleConnection(socket: Socket) {
    console.log(socket.handshake.auth);

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
}
