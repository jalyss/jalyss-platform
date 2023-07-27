import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingBookingDto } from './dto/create-TrainingBooking.dto';
import { UpdateTrainingBookingDto } from './dto/update-TrainingBooking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { session } from 'passport';

@Injectable()
export class TrainingBookingService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateTrainingBookingDto, userId: string) {
   const session= await this.prisma.session.findFirst({where:{tarifs:{some:{id:dto.sessionTarifId}}}})
   console.log('session=======>',session);
   
   const tarifBookings =await this.prisma.trainingBooking.findMany({where:{
      sessiontarif:{
        sessionId:session.id
      },
      userId
    }})
    console.log('tarifBookings=======>',tarifBookings);
    if(tarifBookings.length)
    throw new HttpException("already booked",HttpStatus.BAD_REQUEST)
    return await this.prisma.trainingBooking.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.trainingBooking.findMany({
      include: {
        user: true,
        sessiontarif: { include: { session: true } },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.trainingBooking.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateTrainingBookingDto) {
    return await this.prisma.trainingBooking.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.trainingBooking.delete({
      where: { id },
    });
  }
}
