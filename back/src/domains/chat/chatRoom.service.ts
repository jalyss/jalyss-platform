import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { UpdateChatDto } from './dto/update-chatRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatRoomService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateChatRoomDto) {
    return await this.prisma.chatRoom.create({
      data: dto,
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
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.chatRoom.delete({ where: { id } });
  }
}
