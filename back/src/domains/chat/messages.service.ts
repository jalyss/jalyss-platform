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
  async getChatRoomMessages(chatRoomId: string, numberMessages: number) {
    let take = 20;
    if (numberMessages) {
      take = numberMessages;
    }
    return await this.prisma.chatMessage.findMany({
      where: { chatRoomId },
      include: { user: true },
      take,
      orderBy: { createdAt: 'desc' },
    });
  }
  async getNootSeenMessages(chatRoomId: string) {
    return await this.prisma.chatMessage.findMany({
      where: { chatRoomId: chatRoomId, seen: false },
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

  async MessageSeen(chatRoomId: string, userId: string) {
    return await this.prisma.chatMessage.updateMany({
      where: {
        chatRoomId,
        seen: false,
        userId: { not: userId },
      },
      data: {
        seen: true,
      },
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
