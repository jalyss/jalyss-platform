import { Injectable } from '@nestjs/common';
import { CreateUserPaymentDto } from './dto/create-UserPayment.dto';
import { UpdateUserPaymentgDto } from './dto/update-UserPayment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserPaymentDto,clientId:string) {
    return await this.prisma.clientPayment.create({
      data: {...dto,
      clientId}
    });
  }

  async findAll() {
    return await this.prisma.clientPayment.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.clientPayment.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }

  async update(id: string, dto: UpdateUserPaymentgDto) {
    return await this.prisma.clientPayment.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.clientPayment.delete({
      where: { id },
    });
  }
}
