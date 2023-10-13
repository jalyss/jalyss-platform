import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    private readonly prisma: PrismaService,
) { }
  async create(dto: CreateCityDto) {
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
  findAllCitites() {
    return this.prisma.city.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.city.findFirst({
      where: {
          id,
      },
  });
  }

  async update(id: string, dto: UpdateCityDto) {
    return await this.prisma.city.update({ where: { id }, data: dto });

  }

  async remove(id: string) {
    return await this.prisma.city.delete({ where: { id } });

  }
}
