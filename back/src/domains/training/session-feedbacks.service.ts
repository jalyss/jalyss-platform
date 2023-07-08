import { Injectable } from '@nestjs/common';
import { CreateSessionFeedbackDto } from './dto/create-session-feedback.dto';
import { UpdateSessionFeedbackDto } from './dto/update-session-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionFeedbacksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateSessionFeedbackDto, userId: string) {
    return await this.prisma.sessionFeedback.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.sessionFeedback.findMany({
      include: { User: { include: { avatar: true } } },
    });
  }

  async findBySessionId(sessionId: string) {
    return await this.prisma.sessionFeedback.findMany({
      where: { sessionId },
      include: {
        User: { include: { avatar: true } },
        Session: { include: { tarifs: { include: { bookings: true } } } },
      },
    });
  }

  async update(id: string, dto: UpdateSessionFeedbackDto) {
    return await this.prisma.sessionFeedback.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.sessionFeedback.delete({ where: { id } });
  }
}
