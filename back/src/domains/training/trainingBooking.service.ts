import { Injectable } from '@nestjs/common';
import { CreateTrainingBookingDto } from './dto/create-TrainingBooking.dto';
import { UpdateTrainingBookingDto } from './dto/update-TrainingBooking.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TrainingBookingService  {
  constructor(private readonly prisma:PrismaService) {}
   async create(dto: CreateTrainingBookingDto) {
    return await this.prisma.trainingBooking.create({
      data : {
        ...dto
      }
    });
  }

   async findAll() {
    return await this.prisma.trainingBooking.findMany({ 
      include : {
        user : true, 
        sessiontarif : true, 
      }
       });
  }

  async findOne(id:string) {
    return await this.prisma.trainingBooking.findUnique(
      {
        where : {id}
      }
    );;
  }

  async update(id:string, dto: UpdateTrainingBookingDto) {
    return await this.prisma.trainingBooking.update({
      where : {id}, 
      data : dto,
    })
  }

  async remove(id:string) {
    return await this.prisma.trainingBooking.delete({
      where : {id},
    })
  }
}
