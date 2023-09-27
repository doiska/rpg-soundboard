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
import { AuthenticatedSocket, sessionSchema } from './auth.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server<ServerToClientEvents, ClientToServerEvents>;

  private logger = new Logger('AuthGateway');

  constructor(private connectionService: ConnectionService) {}

  async handleConnection(socket: AuthenticatedSocket) {
    const parse = sessionSchema.safeParse(socket.jwt);

    if (!parse.success) {
      this.logger.error(`No token provided ${socket.id}`);
      await this.connectionService.deleteBySocketId(socket.id);

      socket.disconnect();
    } else {
      const [result] = await this.connectionService.findByUserId(
        socket.jwt.email,
      );

      if (result) {
        const oldSocket = this.server.sockets.sockets.get(result.socketId);

        if (oldSocket) {
          oldSocket.disconnect();
          this.logger.log(`Disconnecting old socket: ${result.socketId}`);
        }

        await this.connectionService.deleteBySocketId(result.socketId);
        this.logger.log(`Old socket disconnected: ${result.socketId}`);
      }

      await this.connectionService.create({
        socketId: socket.id,
        userId: socket.jwt.email,
      });

      this.logger.log(`Client connected: ${socket.id}`);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
