import { Injectable } from '@nestjs/common';
import { CreateUserChatroomDto } from './dto/create-user-chatroom.dto';
import { UpdateUserChatroomDto } from './dto/update-user-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserChatroomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserChatroomDto) {
    return await this.prisma.userChatRoom.create({
      data: dto,
    });
  }

  async remove(dto: UpdateUserChatroomDto) {
    return await this.prisma.userChatRoom.deleteMany({
      where: {
        userId: dto.userId,
        chatRoomId: dto.chatRoomId,
      },
    });
  }
}