import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-Session.dto';
import { UpdateSessionDto } from './dto/update-Session.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FilterSession,
  FilterSessionExample,
} from './entities/training.entity';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionDto) {
    const {
      SessionHasFeaturesIds,
      sessionHasGainsIds,
      sessionHasPrerequiresIds,
      sessionTypesIds,
      tarifs,
      lectures,
      ...rest
    } = dto;

    return await this.prisma.session.create({
      data: {
        ...rest,
        tarifs: {
          create: tarifs.map((tarif) => {
            const { features, ...rest } = tarif;
            return {
              ...rest,
              features: {
                create: features.map((feature) => ({
                  featureId: feature.id,
                  isAvailable: feature.isAvailable,
                })),
              },
            };
          }),
        },
        SessionHasFeatures: {
          create: SessionHasFeaturesIds.map((id) => {
            return {
              featureId: id,
            };
          }),
        },
        SessionHasWhatYouWillLearn: {
          create: sessionHasGainsIds.map((id) => {
            return {
              WhatYouWillLearnId: id,
            };
          }),
        },
        sessionHasPrerequire: {
          create: sessionHasPrerequiresIds.map((id) => {
            return {
              prerequireId: id,
            };
          }),
        },
        sessionType: {
          create: sessionTypesIds.map((id) => {
            return {
              sessionTypeId: id,
            };
          }),
        },
        // lectures: {
        //   create: lectures.map((lecture) => {
        //     return {
        //       lectureId: lecture.lectureId,
        //       startAt: lecture.startAt,
        //       endAt: lecture.endAt,
        //     };
        //   }),
        // },
      },
    });
  }

  async findAll(filters: FilterSession, take: number, skip: number) {
    let errors = [];
    let where = {};
    let orderBy = {};
    Object.entries(filters).forEach(([key, value], i) => {
      console.log('ija', value);
      console.log('where', where);
      if (!(key in FilterSessionExample)) {
        errors.push(key);
      } else {
        where = { ...where, [key]: { in: value } };
        console.log('where where', where);
      }
      if (!['take', 'skip'].includes(key)) {
        if (Array.isArray(value)) {
          console.log('abay', value);
          where = { ...where, [key]: { in: value } };
        }
      }
    });
    if (errors.length) {
      let verbe = errors.length > 1 ? 'are' : 'is';
      let wrongKeys = '';
      errors.forEach((error, i) => {
        console.log(i);

        let separator = i < errors.length - 1 ? ' /' : '';
        wrongKeys += error + separator + ' ';
      });
      throw new HttpException(
        wrongKeys + verbe + ' not matched',
        HttpStatus.BAD_REQUEST,
      );
    }
    orderBy = { createdAt: 'desc' };
    return await this.prisma.$transaction(async (prisma) => {
      let items = await this.prisma.session.findMany({
        where,
        include: {
          tarifs: true,
          sessionType: true,
          lectures: true,
          category: true,
          cover: true,
        },
        orderBy,
        take,
        skip,
      });

      let count = await prisma.session.count({ where });

      return { items, count };
    });
  }

  async findOne(id: string) {
    return await this.prisma.session.findUnique({
      where: { id },
      include: {
        category: true,
        lectures: {
          include: {
            lectures: {
              include: {
                coaching: { include: { user: { include: { avatar: true } } } },
                LectureHasWhatYouWillLearn: {
                  include: { WhatYouWillLearn: true },
                },
              },
            },
          },
        },
        sessionHasPrerequire: { include: { prerequire: true } },
        SessionHasWhatYouWillLearn: { include: { WhatYouWillLearn: true } },
        sessionFeedback: { include: { User: { include: { avatar: true } } } },
        previousSesion: {
          include: {
            sessionFeedback: {
              include: { User: { include: { avatar: true } } },
            },
            tarifs: { include: { bookings: { include: { user: true } } } },
            MediaSession: { include: { media: true } },
          },
        },
        tarifs: {
          include: {
            features: { include: { feature: true } },
            session: true,
            bookings: { include: { user: true } },
          },
        },
        cover: true,
        sessionType: { include: { sessiontype: true } },
        MediaSession: { include: { media: true } },
        SessionHasFeatures: { include: { feature: true } },
      },
    });
  }

  async update(id: string, dto: UpdateSessionDto) {
    const {
      SessionHasFeaturesIds,
      sessionHasGainsIds,
      sessionHasPrerequiresIds,
      sessionTypesIds,
      tarifs,
      lectures,
      ...rest
    } = dto;
    await this.prisma.$transaction(async (prisma) => {
      if (SessionHasFeaturesIds?.length)
        await prisma.sessionHasFeatures.deleteMany({
          where: {
            sessionId: id,
          },
        });
      if (sessionHasGainsIds?.length)
        await prisma.sessionHasWhatYouWillLearn.deleteMany({
          where: {
            sessionId: id,
          },
        });
      if (sessionHasPrerequiresIds?.length)
        await prisma.sessionHasPrerequire.deleteMany({
          where: {
            sessionId: id,
          },
        });
      if (sessionTypesIds?.length)
        await prisma.sessionHasSessionType.deleteMany({
          where: {
            sessionId: id,
          },
        });
      if (sessionHasGainsIds?.length)
        await prisma.sessionHasWhatYouWillLearn.deleteMany({
          where: {
            sessionId: id,
          },
        });
      if (tarifs?.length)
        await prisma.sessionTarif.deleteMany({
          where: {
            sessionId: id,
          },
        });
      return await prisma.session.update({
        where: { id },
        data: {
          ...rest,
          tarifs: {
            create: tarifs.map((tarif) => {
              const { features, ...rest } = tarif;
              return {
                ...rest,
                features: {
                  create: features.map((feature) => ({
                    featureId: feature.id,
                    isAvailable: feature.isAvailable,
                  })),
                },
              };
            }),
          },
          SessionHasFeatures: {
            create: SessionHasFeaturesIds.map((id) => {
              return {
                featureId: id,
              };
            }),
          },
          SessionHasWhatYouWillLearn: {
            create: sessionHasGainsIds.map((id) => {
              return {
                WhatYouWillLearnId: id,
              };
            }),
          },
          sessionHasPrerequire: {
            create: sessionHasPrerequiresIds.map((id) => {
              return {
                prerequireId: id,
              };
            }),
          },
          sessionType: {
            create: sessionTypesIds.map((id) => {
              return {
                sessionTypeId: id,
              };
            }),
          },
          lectures: {
            create: lectures.map((lecture) => {
              return {
                lectureId: lecture.lectureId,
                startAt: lecture.startAt,
                endAt: lecture.endAt,
              };
            }),
          },
        },
      });
    });
  }

  async remove(id: string) {
    return await this.prisma.session.delete({
      where: { id },
    });
  }

  async findAllSessionTitles() {
    return await this.prisma.session.findMany({
      select: {
        title: true,
      },
    });
  }
}
