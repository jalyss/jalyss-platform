import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,

  ) { }

  async create(dto: CreateCategoryDto) {
    return await this.prisma.articleCategory.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.articleCategory.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.articleCategory.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return await this.prisma.articleCategory.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.articleCategory.delete({ where: { id } });
  }
}
