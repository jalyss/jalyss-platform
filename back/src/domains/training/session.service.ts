import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-Session.dto';
import { UpdateSessionDto } from './dto/update-Session.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionDto) {
    return await this.prisma.session.create({
      data: { ...dto },
    });
  }

  async findAll() {
    return await this.prisma.session.findMany({
      include: {
        tarifs: true,
        sessionType: true,
        lectures: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.session.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateSessionDto) {
    return await this.prisma.session.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    return await this.prisma.session.delete({
      where: { id },
    });
  }
}
