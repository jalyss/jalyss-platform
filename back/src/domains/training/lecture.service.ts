import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-Lecture.dto';
import { UpdateLectureDto } from './dto/update-Lecture.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLectureDto) {
    const { lecturesHasGainsIds, cochingIds, ...rest } = dto;
    return await this.prisma.lecture.create({
      data: {
        ...rest,
        LectureHasWhatYouWillLearn: {
          create: lecturesHasGainsIds.map((id) => {
            return {
              WhatYouWillLearnId: id,
            };
          }),
        },
        coaching: {
          create: cochingIds.map((id) => {
            return {
              userId: id,
            };
          }),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.lecture.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        coaching: true,
        LectureHasWhatYouWillLearn: { include: { WhatYouWillLearn: true } },
        assesments: true,
        sessions: {
          include: {
            session: {
              select: {
                titleEn: true,
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
      include: {
        LectureHasWhatYouWillLearn: { include: { WhatYouWillLearn: true } },
        coaching: { include: { user: true } },
      },
    });
  }

  async update(id: string, dto: UpdateLectureDto) {
    const { lecturesHasGainsIds, cochingIds, ...rest } = dto;
    return await this.prisma.$transaction(async (prisma) => {
      if (lecturesHasGainsIds?.length)
        await prisma.lectureHasWhatYouWillLearn.deleteMany({
          where: {
            lectureId: id,
          },
        });
      if (cochingIds?.length)
        await prisma.coaching.deleteMany({
          where: {
            lectureId: id,
          },
        });
      return await prisma.lecture.update({
        where: { id },
        data: {
          ...rest,
          LectureHasWhatYouWillLearn: {
            create: lecturesHasGainsIds.map((id) => {
              return {
                WhatYouWillLearnId: id,
              };
            }),
          },
          coaching: {
            create: cochingIds.map((id) => {
              return {
                userId: id,
              };
            }),
          },
        },
      });
    });
  }

  async remove(id: string) {
    return await this.prisma.lecture.delete({
      where: { id },
    });
  }
}
