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

  // findOne(id: number) {
  //   return `This action returns a #${id} jobTitle`;
  // }

  // update(id: number, updateJobTitleDto: UpdateJobTitleDto) {
  //   return `This action updates a #${id} jobTitle`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} jobTitle`;
  // }
}
