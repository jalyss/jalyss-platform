import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateClientDto) {
    return await this.prisma.client.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.client.findMany({
      include: {
        avatar: true,
        country: true,
        category: true,
        city: true,
        jobTitle: true,
        functionalArea: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
  findAllCitites() {
    return this.prisma.client.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.client.findFirst({
      where: {
        id,
      },
      include: {
        avatar: true,
        country: true,
        category: true,
        city: true,
        jobTitle: true,
        functionalArea: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: string, dto: UpdateClientDto) {
    return await this.prisma.client.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.client.delete({ where: { id } });
  }
}
