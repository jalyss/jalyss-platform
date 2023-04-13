import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
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

//   async findOne(id: string) {
//     return await this.prisma.articleCategory.findFirst({
//       where: {
//         id,
//       },
//     });
//   }

//   async update(id: string, dto: UpdateCategoryDto) {
//     return await this.prisma.articleCategory.update({ where: { id }, data: dto });
//   }

//   async remove(id: string) {
//     return await this.prisma.articleCategory.delete({ where: { id } });
//   }
}
