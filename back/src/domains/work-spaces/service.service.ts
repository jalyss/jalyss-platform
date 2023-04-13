import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ServiceService {
    constructor(
        private readonly prisma: PrismaService,
    
      ) { }


  async create(dto:CreateServiceDto) {
    return await this.prisma.service.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.service.findMany();
  }

 
}
