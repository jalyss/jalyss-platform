import { Injectable } from '@nestjs/common';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountCodesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateDiscountCodeDto) {
    return await this.prisma.discountCode.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.discountCode.findMany({
      include: { client: true },
    });
  }

  async findOne(params: string) {
    return await this.prisma.discountCode.findFirstOrThrow({
      where: {
        OR: [
          {
            id: params,
          },
          { code: params },
        ],
      },
    });
  }

  async update(id: string, dto: UpdateDiscountCodeDto) {
    return await this.prisma.discountCode.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.discountCode.delete({ where: { id } });
  }
}
