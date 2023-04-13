import { Injectable } from '@nestjs/common';
import { CreateTarifDto } from './dto/create-tarif.dto';
// import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TarifService {
    constructor(
        private readonly prisma: PrismaService,
    
      ) { }


//   async create(dto:CreateTarifDto) {
//     return await this.prisma.tarif.create({
//       data: dto,
//     });
//   }

  findAll() {
    return this.prisma.tarif.findMany();
  }

 
}
