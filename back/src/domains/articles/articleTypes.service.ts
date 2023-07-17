import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class ArticleTypeService {
  constructor(
    private readonly prisma: PrismaService,

  ) {}

  async create(dto: CreateTypeDto) {
    return await this.prisma.type.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.type.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.type.findFirst({
      where: {
        id,
      },
      include: {articles:{select:{title:true}}}
    });
  }

  async update(id: string, dto: UpdateTypeDto) {
    return await this.prisma.type.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.type.delete({ where: { id } });
  }
}

