import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionHasLectureDto } from './dto/create-sessionHasLecture.dto';

@Injectable()
export class SessionHasLectureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionHasLectureDto) {
    const { lectureId, sessionIds, startAt, endAt } = dto;
    return await Promise.all(
      sessionIds.map(
        async (sessionId) =>
          await this.prisma.sessionHasLecture.create({
            data: { lectureId, sessionId, startAt, endAt },
          }),
      ),
    );
  }

  async findAll() {
    return await this.prisma.sessionHasLecture.findMany({});
  }

  //   async findOne(id: string) {
  //     return await this.prisma.lecture.findUnique({
  //       where: { id },
  //     });
  //   }

  //   async update(id: string, dto: UpdateLectureDto) {
  //     return await this.prisma.lecture.update({
  //       where: { id },
  //       data: dto,
  //     });
  //   }

  //   async remove(id: string) {
  //     return await this.prisma.sessionHasLecture.delete({
  //       where: { id },
  //     });
  //   }
}
