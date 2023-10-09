import { Injectable } from '@nestjs/common';
import { CreateClientPaymentDto } from '../client/dto/create-ClientPayment.dto';
import { UpdateClientPaymentgDto } from '../client/dto/update-ClientPayment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientPaymentDto,clientId:string) {
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

  async update(id: string, dto: UpdateClientPaymentgDto) {
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
