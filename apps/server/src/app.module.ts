import { Module } from '@nestjs/common';
import { RoomModule } from './rooms/room.module';
import { UserModule } from './users/user.module';
import { AuthGateway } from './auth/auth.gateway';
import { ConnectionService } from './ws-connections/connection.service';

@Module({
  imports: [RoomModule, UserModule],
  controllers: [],
  providers: [AuthGateway, ConnectionService],
})
export class AppModule {}
