import { Injectable } from '@nestjs/common';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobTitlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateJobTitleDto) {
    return await this.prisma.jobTitle.create({
      data: { ...dto },
    });
  }

  async findAll() {
    return await this.prisma.jobTitle.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.jobTitle.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateJobTitleDto) {
    return await this.prisma.jobTitle.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    return await this.prisma.jobTitle.delete({ where: { id } });
  }
}
