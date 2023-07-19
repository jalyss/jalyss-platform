import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeaturesDto } from './dto/create-features.dto';
import { UpdateFeaturesDto } from './dto/update-features.dto';

@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFeaturesDto) {


    return await this.prisma.feature.create({
      data: { ...dto},
    });
  }
  // async  create(createDecisionDto: CreateDecisionDto) {
  //   const {decisionApplyIds, ...rest}=createDecisionDto
  //   return await  this.prisma.decision.create({
  //     data:{
  //       ...rest,
  //       DecisionApply:{
  //        create:decisionApplyIds.map((id)=>{
  //         return {
  //           employeeId: id,
  //         }
  //        })
  
  //       }
  //     }
  //   });
  //   }

  async findAll() {
    return await this.prisma.feature.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include:{
        SessionTarifHasFeatures:{include:{sessionTarif:true}}
      }
    });
  }
  
  
  

//   async findOne(id: string) {
//     return await this.prisma.feature.findUnique({
//       where: { id },
      
//     });
//   }

  async update(id: string, dto: UpdateFeaturesDto) {
    console.log("dto",dto);
    
    return await this.prisma.feature.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.feature.delete({
      where: { id },
    });
  }
}
