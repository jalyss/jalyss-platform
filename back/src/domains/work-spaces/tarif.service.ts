import { Injectable } from '@nestjs/common';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TarifService {
    constructor(
        private readonly prisma: PrismaService,
    
      ) { }


   
  async create(dto:CreateTarifDto) {
    return await this.prisma.tarif.create({
      data: dto,
    });
  }
      

  async findAll() {
    return this.prisma.tarif.findMany({
      include: { bookings: true }
    });
  }
  async findOne(id: string) {
    return await this.prisma.tarif.findFirst({
        where: {
            id,
        },
    });

}

async update(id: string, dto: UpdateTarifDto) {
  return await this.prisma.tarif.update({ where: { id }, data: dto });
}

async remove(id: string) {
  // Find the tariff and its associated bookings
  const tariff = await this.prisma.tarif.findUnique({ where: { id }, include: { bookings: true } });
  
  // Delete the bookings first
  const deleteBookings = tariff.bookings.map(booking => this.prisma.booking.delete({ where: { id: booking.id } }));
  await Promise.all(deleteBookings);
  
  // Delete the tariff
  return await this.prisma.tarif.delete({ where: { id } });
}


 
}
