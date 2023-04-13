import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateMessageDto ) {
    return await this.prisma.chatMessage.create({
      data:dto
    });
  }

  async findAll() {
    return await this.prisma.chatMessage.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.chatMessage.findUnique({
      where: { id },
      
    });
  }

  async update(id: string, dto: UpdateMessageDto) {
    return await this.prisma.chatMessage.update({
      where: { id },
      data:dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.chatMessage.delete({ where: { id } });
  }
}