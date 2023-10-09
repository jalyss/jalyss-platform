import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentChoiceDto } from './dto/create-paymentChoice.dto';
import { UpdatePaymentChoiceDto } from './dto/update-paymentChoice.dto';

@Injectable()
export class PaymentChoicesService {
  constructor(
    private readonly prisma: PrismaService,
) { }
  async create(dto: CreatePaymentChoiceDto) {
    return await this.prisma.paymentChoice.create({
      data: {
          ...dto,
      },
  });
  }

  findAll() {
    return this.prisma.paymentChoice.findMany({
    });
  }
  

  async findOne(id: string) {
    return await this.prisma.paymentChoice.findFirst({
      where: {
          id,
      },
  });
  }

  async update(id: string, dto: UpdatePaymentChoiceDto) {
    return await this.prisma.paymentChoice.update({ where: { id }, data: dto });

  }

  async remove(id: string) {
    return await this.prisma.paymentChoice.delete({ where: { id } });

  }
}
