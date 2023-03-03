import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublishingHouseDto } from './dto/create-publishingHouse.dto';
import { UpdatePublishingHouseDto } from './dto/update-publishingHouse.dto';

@Injectable()
export class PublishingHouseService {
  constructor(
    private readonly prisma: PrismaService,

  ) {}

  async create(dto: CreatePublishingHouseDto) {
    return await this.prisma.publishingHouse.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.publishingHouse.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.publishingHouse.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdatePublishingHouseDto) {
    return await this.prisma.publishingHouse.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.publishingHouse.delete({ where: { id } });
  }
}
