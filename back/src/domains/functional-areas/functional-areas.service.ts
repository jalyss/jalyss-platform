import { Injectable } from '@nestjs/common';
import { CreateFunctionalAreaDto } from './dto/create-functional-area.dto';
import { UpdateFunctionalAreaDto } from './dto/update-functional-area.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FunctionalAreaFilters } from './entities/functional-area.entity';

@Injectable()
export class FunctionalAreasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFunctionalAreaDto) {
    return await this.prisma.functionalArea.create({
      data: { ...dto },
    });
  }

  async findAll(filters: FunctionalAreaFilters) {
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
    return await this.prisma.functionalArea.findMany({ where, take });
  }

  async findOne(id: string) {
    return await this.prisma.functionalArea.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateFunctionalAreaDto) {
    return await this.prisma.functionalArea.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    return await this.prisma.functionalArea.delete({ where: { id } });
  }
}
