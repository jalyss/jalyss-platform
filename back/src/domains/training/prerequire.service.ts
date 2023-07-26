import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrerequireDto } from './dto/create-prerequire.dto';
import { UpdatePrerequireDto } from './dto/update-prerequire.dto';



@Injectable()
export class PrerequireService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePrerequireDto) {


    return await this.prisma.prerequire.create({
      data: { ...dto},
    });
  }


  async findAll() {
    return await this.prisma.prerequire.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
  }
  


  async update(id: string, dto: UpdatePrerequireDto) {
    console.log("dto",dto);
    
    return await this.prisma.prerequire.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.prerequire.delete({
      where: { id },
    });
  }
}
