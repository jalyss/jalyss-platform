import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private readonly prisma: PrismaService) {}
 async create(data: CreateProviderDto) {
  
    return await this.prisma.provider.create({
      data ,
      include:{logo:true},
    });
  }
 
  async findAll() {
    return await this.prisma.provider.findMany({});
   }

   async findOne(id: string) {
    return await this.prisma.provider.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateProviderDto) {
    return await this.prisma.provider.update({ where: { id }, data: dto });

  }

  async remove(id: string) {
    return await this.prisma.provider.delete({ where: { id } });

  }
}
