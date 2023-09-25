import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Room, roomMembers, rooms } from '@/schema/room.schema';
import { kil } from '@/schema/db';
import { and, eq } from 'drizzle-orm';
import { UserService } from '../users/user.service';

@Injectable()
export class RoomService {
  constructor(private userService: UserService) {}

  async createRoom(room: Room) {
    if (await this.getRoom(room.id)) {
      throw new ConflictException('Room already exists');
    }

    await kil.insert(rooms).values(room);
  }

  async deleteRoom(id: string) {
    await kil.delete(rooms).where(eq(rooms.id, id));
  }

  async getRoom(id: string) {
    const [result] = await kil.select().from(rooms).where(eq(rooms.id, id));
    return result;
  }

  async addUserToRoom(roomId: string, userId: string) {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await this.isUserInRoom(roomId, userId)) {
      throw new ConflictException('User already in room');
    }

    await kil.insert(roomMembers).values({ roomId: roomId, userId: user.id });
  }

  async isUserInRoom(roomId: string, userId: string) {
    const user = await this.userService.getUser(userId);

    if (!user) {
      return false;
    }

    const isInRoom = await kil
      .select()
      .from(roomMembers)
      .where(
        and(eq(roomMembers.roomId, roomId), eq(roomMembers.userId, user.id)),
      );

    return isInRoom.length > 0;
  }

  async removeUserFromRoom(roomId: string, userId: string) {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await kil
      .delete(roomMembers)
      .where(
        and(eq(roomMembers.roomId, roomId), eq(roomMembers.userId, user.id)),
      );
  }

  async getUsersInRoom(roomId: string) {
    return kil
      .select()
      .from(roomMembers)
      .where(and(eq(roomMembers.roomId, roomId)));
  }
}
