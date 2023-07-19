import { Injectable } from '@nestjs/common';
import { CreateSessionTarifDto } from './dto/create-SessionTarif.dto';
import { UpdateSessionTarifDto } from './dto/update-SessionTarif.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SessionTarifService {
  constructor (private readonly prisma : PrismaService) {}
  async create(dto: CreateSessionTarifDto) {
    const { sessionId, features, ...sessionTarifData } = dto;

    const sessionTarif = await this.prisma.sessionTarif.create({
      data: {
        ...sessionTarifData,
        session: { connect: { id: sessionId } }, // Connect to the related Session
      },
    });

   
    if (features && features.length > 0) {
      for (const feature of features) {
        await this.prisma.sessionTarifHasFeatures.create({
          data: {
            feature: { connect: { id: feature.featureId } },
            sessionTarif: { connect: { id: sessionTarif.id } },
            isAvailable: feature.isAvailable,
          },
        });
      }
    }

    return sessionTarif;
  }

  async findAll() {
    try {
      return await this.prisma.sessionTarif.findMany({
        include: {
          bookings: true,
          session: true
        },
        orderBy: {
          createdAt: 'desc',
        }
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error; // or handle the error appropriately
    }
  }
  

   async findOne(id: string) {
    return await this.prisma.sessionTarif.findUnique({
      where : {id}
    })
  }

  // async update(id: string, dto: UpdateSessionTarifDto) {
  //   return await this.prisma.sessionTarif.update({
  //     where : {id} , 
  //     data : dto 
  //   });
  // }

 async remove(id: string) {
    return await this.prisma.sessionTarif.delete({
      where : {id}
    })
  }
}
