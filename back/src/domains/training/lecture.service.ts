import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-Lecture.dto';
import { UpdateLectureDto } from './dto/update-Lecture.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLectureDto) {
    return await this.prisma.lecture.create({
      data: { ...dto },
    });
  }

  async findAll() {
    return await this.prisma.lecture.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        coaching: true,
        assesments: true,
        sessions: {
          include: {
            session: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
  }
  
  
  

  async findOne(id: string) {
    return await this.prisma.lecture.findUnique({
      where: { id },
      
    });
  }

  async update(id: string, dto: UpdateLectureDto) {
    return await this.prisma.lecture.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.lecture.delete({
      where: { id },
    });
  }
}
