import { Module } from '@nestjs/common';
import { UserChatroomService } from './user-chatroom.service';
import { UserChatroomController } from './user-chatroom.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserChatroomController],
  providers: [UserChatroomService,PrismaService]
})
export class UserChatroomModule {}
