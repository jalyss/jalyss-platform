import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryFilters } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCountryDto) {
    return await this.prisma.country.create({
      data: {
        ...dto,
      },
    });
  }

  findAll(filters: CountryFilters) {
    let where = {};
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
    return this.prisma.country.findMany({
      where,
      take,
    });
  }

  async findOne(id: string) {
    return await this.prisma.country.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateCountryDto) {
    return await this.prisma.country.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.country.delete({ where: { id } });
  }
}
