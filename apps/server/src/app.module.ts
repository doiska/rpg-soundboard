import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './rooms/room.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        'apps',
        'server',
        'dist',
        'client',
      ),
    }),
    ChatModule,
    RoomModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
