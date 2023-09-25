import { Injectable } from '@nestjs/common';
import { Room, rooms, roomsInsertSchema } from '@/schema/room.schema';
import { kil } from '@/schema/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class RoomService {
  async addRoom(room: Room) {
    roomsInsertSchema.parse(room);
    await kil.insert(rooms).values(room);
  }

  async removeRoom(id: number) {
    await kil.delete(rooms).where(eq(rooms.id, id));
  }

  async getRoom(id: number) {
    return kil.select().from(rooms).where(eq(rooms.id, id));
  }

  async getRooms() {
    return kil.select().from(rooms);
  }
}
