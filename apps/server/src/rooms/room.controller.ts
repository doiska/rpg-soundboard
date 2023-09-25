import {
  Get,
  Controller,
  Post,
  Delete,
  Param,
  NotFoundException,
  Body,
  UsePipes,
} from '@nestjs/common';

import { RoomService } from './room.service';
import { Room, roomsInsertSchema } from '@/schema/room.schema';
import { ZodValidationPipe } from '../pipes/zod.pipe';
import { z } from 'zod';

@Controller()
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('api/room')
  @UsePipes(new ZodValidationPipe(roomsInsertSchema))
  async addRoom(@Body() room: Room) {
    return this.roomService.createRoom(room);
  }

  @Get('api/room/:id')
  @UsePipes(new ZodValidationPipe(z.string()))
  async getRoom(@Param('id') id: string) {
    const result = await this.roomService.getRoom(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Delete('api/room/:id')
  @UsePipes(new ZodValidationPipe(z.string()))
  async removeRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }

  @Post('api/room/:roomId/user/:userId')
  async addUserToRoom(
    @Param('roomId') roomId: string,
    @Param('userId') userId: string,
  ) {
    await this.roomService.addUserToRoom(roomId, userId);
  }

  @Delete('api/room/:roomId/user/:userId')
  async removeUserFromRoom(
    @Param('roomId') roomId: string,
    @Param('userId') userId: string,
  ) {
    return this.roomService.removeUserFromRoom(roomId, userId);
  }
}
