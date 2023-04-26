import { Injectable } from '@nestjs/common';
import { CreateUserPaymentDto } from './dto/create-UserPayment.dto';
import { UpdateUserPaymentgDto } from './dto/update-UserPayment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserPaymentDto,userId:string) {
    return await this.prisma.userPayment.create({
      data: {...dto,
      userId}
    });
  }

  async findAll() {
    return await this.prisma.userPayment.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.userPayment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: string, dto: UpdateUserPaymentgDto) {
    return await this.prisma.userPayment.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.userPayment.delete({
      where: { id },
    });
  }
}