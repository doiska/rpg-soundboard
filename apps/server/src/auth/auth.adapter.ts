import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

export class AuthenticatedSocketAdapter extends IoAdapter {
  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);

    server.use(async (socket: any, next) => {
      const payload: string = socket.handshake?.auth?.token;

      if (!payload) {
        console.error('Token not provided', socket.handshake);
        return next(new Error('Token not provided'));
      }

      const [method] = payload.split(' ');

      if (method !== 'Bearer') {
        return next(
          new Error('Invalid authentication method. Only Bearer is supported.'),
        );
      }

      try {
        socket.user = {};
        return next();
      } catch (error: any) {
        return next(new Error('Authentication error'));
      }
    });

    return server;
  }
}
