import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,

  ) { }


  async create(dto:CreateBookingDto) {
    return await this.prisma.booking.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.booking.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateBookingDto) {
    return await this.prisma.booking.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.booking.delete({ where: { id } });
  }
}
