import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { kil } from '@/schema/db';
import { users } from '@/schema/user.schema';
import { eq } from 'drizzle-orm';
import { sessionSchema } from './auth.schema';
import { Logger } from '@nestjs/common';

export class AuthenticatedSocketAdapter extends IoAdapter {
  private logger = new Logger('AuthAdapter');

  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);

    server.use(async (socket: any, next) => {
      const payload: string = socket.handshake?.auth?.token;

      this.logger.log(`Received a new connection: ${socket.id}`);

      if (!payload) {
        this.logger.error('Connection rejected, no token provided');
        return next(new Error('Token not provided'));
      }

      let session: unknown;

      try {
        session = jwt.verify(payload, 'TESTE_SECRET');
      } catch (error: any) {
        this.logger.error('Invalid token');
        return next(new Error('Invalid token'));
      }

      const parse = sessionSchema.safeParse(session);

      if (!parse.success) {
        this.logger.error('Invalid token');
        return next(new Error('Invalid token'));
      }

      const [result] = await kil
        .select()
        .from(users)
        .where(eq(users.email, parse.data.email));

      if (!result) {
        this.logger.error('User not found');
        return next(new Error('User not found'));
      }

      try {
        this.logger.log('Authenticated, saving jwt in socket');
        socket.jwt = parse.data;
        return next();
      } catch (error: any) {
        return next(new Error('Authentication error'));
      }
    });

    return server;
  }
}
