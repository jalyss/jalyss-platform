import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGainDto } from './dto/create-gain.dto';
import { UpdateGainDto } from './dto/update-gain.dto';


@Injectable()
export class GainService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGainDto) {


    return await this.prisma.whatYouWillLearn.create({
      data: { ...dto},
    });
  }


  async findAll() {
    return await this.prisma.whatYouWillLearn.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
  }
  


  async update(id: string, dto: UpdateGainDto) {
    console.log("dto",dto);
    
    return await this.prisma.whatYouWillLearn.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.whatYouWillLearn.delete({
      where: { id },
    });
  }
}
