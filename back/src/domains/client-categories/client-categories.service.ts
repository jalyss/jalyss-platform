import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCiteDto } from './dto/create.dto';
import { UpdateCiteDto } from './dto/update.dto';

@Injectable()
export class ClientCategoryService {
  constructor(
    private readonly prisma: PrismaService,
) { }
  async create(dto: CreateCiteDto) {
    return await this.prisma.clientCategory.create({
      data: {
          ...dto,
      },
  });
  }

  findAll(countryId:string) {
    return this.prisma.clientCategory.findMany();
  }
  findAllCitites() {
    return this.prisma.clientCategory.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.clientCategory.findFirst({
      where: {
          id,
      },
  });
  }

  async update(id: string, dto: UpdateCiteDto) {
    return await this.prisma.clientCategory.update({ where: { id }, data: dto });

  }

  async remove(id: string) {
    return await this.prisma.clientCategory.delete({ where: { id } });

  }
}
