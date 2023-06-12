import { Module } from '@nestjs/common';
import { ChatRoomService } from './chatRoom.service';
import { ChatRoomController } from './chatRoom.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ChatGateway } from './chat.gateway';
import { UsersService } from '../users/users.service';
import { ConnectedUsersService } from './connectedUsers.service';
import { ConnectedUserController } from './connectedUsers.controller';

@Module({
  controllers: [ChatRoomController, MessagesController,ConnectedUserController],

  providers: [ChatRoomService, MessagesService, PrismaService,ChatGateway,UsersService,ConnectedUsersService],
})
export class ChatModule {}
