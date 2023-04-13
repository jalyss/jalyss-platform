import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateChatDto) {
    return await this.prisma.chatRoom.create({
      data:dto
    });
  }

  async findAll() {
    return await this.prisma.chatRoom.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.chatRoom.findUnique({
      where: { id },
      include: { messages: true },
    });
  }

  async update(id: string, dto: UpdateChatDto) {
    return await this.prisma.chatRoom.update({
      where: { id },
      data:dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.chatRoom.delete({ where: { id } });
  }
}