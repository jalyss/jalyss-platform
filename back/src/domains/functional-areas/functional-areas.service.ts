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
    return await this.prisma.functionalArea.findMany({});
  }

}
