import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityFilters } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCityDto) {
    return await this.prisma.city.create({
      data: {
        ...dto,
      },
    });
  }

  findAllByCountry(countryId: string, filters: CityFilters) {
    let where = { countryId };
    let take = 10;

    if (filters.name) {
      const params = { contains: filters.name, mode: 'insensitive' };
      where['OR'] = [
        { nameAr: params },
        { nameEn: params },
        { nameFr: params },
      ];
    }
    if (filters.take) {
      take = +filters.take;
    }
    return this.prisma.city.findMany({
      where,
      take,
    });
  }
  findAll() {
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
