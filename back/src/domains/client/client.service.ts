import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FilterClient } from './types';
import { skip } from 'rxjs';

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

  findAll(filters: FilterClient) {
    let where = {};
    let skip = 0;
    let take = 10;
    if (filters.skip) skip = +filters.skip;
    if (filters.take) take = +filters.take;
    if (filters.fullNameEn)
      where['fullNameEn'] = {
        contains: filters.fullNameEn,
      };

      
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
      where,
      skip,
      take,
    });
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
