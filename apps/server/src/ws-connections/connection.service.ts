import { kil } from '@/schema/db';
import {
  ConnectionInsert,
  connections,
  connectionsInsertSchema,
} from '@/schema/connection';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ConnectionService {
  async create(connectionInsert: ConnectionInsert) {
    connectionsInsertSchema.parse(connectionInsert);
    await kil.insert(connections).values(connectionInsert);
  }

  async findBySocketId(socketId: string) {
    return kil
      .select()
      .from(connections)
      .where(eq(connections.socketId, socketId));
  }

  async deleteBySocketId(socketId: string) {
    await kil.delete(connections).where(eq(connections.socketId, socketId));
  }
}
