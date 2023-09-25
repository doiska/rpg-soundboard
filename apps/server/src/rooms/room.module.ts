import { Module } from '@nestjs/common';
import { RoomService } from './room.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
