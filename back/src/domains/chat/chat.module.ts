import { Module } from '@nestjs/common';
import { ChatRoomService } from './chatRoom.service';
import { ChatRoomController } from './chatRoom.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [ChatRoomController, MessagesController],

  providers: [ChatRoomService, MessagesService, PrismaService],
})
export class ChatModule {}
