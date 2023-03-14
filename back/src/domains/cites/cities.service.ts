import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCiteDto } from './dto/create-cite.dto';
import { UpdateCiteDto } from './dto/update-cite.dto';

@Injectable()
export class CitiesService {
  constructor(
    private readonly prisma: PrismaService,
) { }
  async create(dto: CreateCiteDto) {
    return await this.prisma.city.create({
      data: {
          ...dto,
      },
  });
  }

  findAll(countryId:string) {
    return this.prisma.city.findMany({
      where:{countryId}
    });
  }

  async findOne(id: string) {
    return await this.prisma.city.findFirst({
      where: {
          id,
      },
  });
  }

  async update(id: string, dto: UpdateCiteDto) {
    return await this.prisma.city.update({ where: { id }, data: dto });

  }

  async remove(id: string) {
    return await this.prisma.city.delete({ where: { id } });

  }
}
