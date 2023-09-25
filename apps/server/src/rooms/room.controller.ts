import { Get, Controller, Post, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '@/schema/room.schema';

@Controller()
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('api/room')
  async addRoom(room: Room) {
    return this.roomService.addRoom(room);
  }

  @Get('api/room/:id')
  async getRoom(id: number) {
    return this.roomService.getRoom(id);
  }

  @Delete('api/room/:id')
  async removeRoom(id: number) {
    return this.roomService.removeRoom(id);
  }
}
