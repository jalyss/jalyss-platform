import { Injectable } from '@nestjs/common';
import { CreateFunctionalAreaDto } from './dto/create-functional-area.dto';
import { UpdateFunctionalAreaDto } from './dto/update-functional-area.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FunctionalAreasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFunctionalAreaDto) {
    return await this.prisma.functionalArea.create({
      data: { ...dto },
    });
  }

  async findAll() {
    return await this.prisma.functionalArea.findMany();
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
