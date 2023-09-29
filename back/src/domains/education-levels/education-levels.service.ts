import { Injectable } from '@nestjs/common';
import { CreateEducationLevelDto } from './dto/create-education-level.dto';
import { UpdateEducationLevelDto } from './dto/update-education-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EducationLevelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEducationLevelDto) {
    return await this.prisma.educationLevel.create({
      data: { ...dto },
    });
  }

  async findAll() {
    return await this.prisma.educationLevel.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.educationLevel.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateEducationLevelDto) {
    return await this.prisma.educationLevel.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    return await this.prisma.educationLevel.delete({ where: { id } });
  }
}
