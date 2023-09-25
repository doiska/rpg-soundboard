import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { UserModule } from '../users/user.module';
import { RoomController } from './room.controller';

@Module({
  imports: [UserModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
