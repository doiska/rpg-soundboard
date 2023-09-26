import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ConnectionService } from '../ws-connections/connection.service';

@Module({
  providers: [ChatGateway, ConnectionService],
})
export class ChatModule {}
