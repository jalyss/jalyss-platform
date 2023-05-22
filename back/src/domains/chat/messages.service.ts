import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto, userId: string, chatRoomId: string) {
    return await this.prisma.chatMessage.create({
      data: {
        ...dto,
        userId,
        chatRoomId,
      },
    });
  }

  async getChatRoomMessages(chatRoomId: string) {
    return await this.prisma.chatMessage.findMany({
      where: { chatRoomId },
      include: { user: true },
    });
  }

  async update(chatRoomId: string, messageId: string, dto: UpdateMessageDto) {
    return await this.prisma.chatMessage.updateMany({
      where: {
        chatRoomId: chatRoomId,
        id: messageId,
      },
      data: dto,
    });
  }
  async remove(chatRoomId: string, messageId: string) {
    return await this.prisma.chatMessage.deleteMany({
      where: {
        chatRoomId: chatRoomId,
        id: messageId,
      },
    });
  }
}
