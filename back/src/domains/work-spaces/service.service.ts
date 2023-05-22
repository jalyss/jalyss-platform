import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateServiceDto } from './dto/update-service.dto';
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
    return this.prisma.service.findMany({
      include: {
        workSpace: true,
        tarif: true
      }
    });

  }

  async findOne(id: string) {
    return await this.prisma.service.findFirst({
        where: {
            id,
        },
    });

}

async update(id: string, dto: UpdateServiceDto) {
    return await this.prisma.service.update({ where: { id }, data: dto });
}

async remove(id: string) {
  const service = await this.prisma.service.findUnique({
    where: { id },
    include: { workSpace: true , tarif: true },
  });

  if (!service) {
    throw new Error(`Service with id ${id} not found`);
  }

  const workSpaces = service.workSpace;
  const tarifs = service.tarif;

  if (workSpaces && workSpaces.length > 0) {
    for (const workSpace of workSpaces) {
      await this.prisma.workSpace.delete({ where: { id: workSpace.id } });
    }
  }

  if (tarifs && tarifs.length > 0) {
    for (const tariff of tarifs) {
      
      await this.prisma.booking.deleteMany({ where: { tarifId: tariff.id } });
   
      await this.prisma.tarif.delete({ where: { id: tariff.id } });
    }
  }

  await this.prisma.service.delete({ where: { id } });
}
 
}
