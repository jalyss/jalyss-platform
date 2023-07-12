import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-Session.dto';
import { UpdateSessionDto } from './dto/update-Session.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterSession, FilterSessionExample } from './entities/training.entity';
import { features } from 'process';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionDto) {
    return await this.prisma.session.create({
      data: { ...dto },
    });
  }

  async findAll(filters:FilterSession, 
    take: number,
    skip: number) {
     let errors = [];
    let where = {};
    let orderBy = {};
    Object.entries(filters).forEach(([key,value],i)=>{
      console.log("ija",value)
      console.log("where",where)
if (!(key in FilterSessionExample)) {
  errors.push(key)
}
else {
  where = { ...where, [key]: { in: value } }
  console.log("where where",where)
}
if (!['take', 'skip'].includes(key)) {
        if (Array.isArray(value)) {
          console.log("abay",value)
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
          category:true,
          cover:true
        },
        orderBy,
        take,
        skip
      });
  
      let count = await prisma.session.count({ where });

      return { items, count };
    });
  

  }

  async findOne(id: string) {
    return await this.prisma.session.findUnique({
      where: { id },
      include:{
        category:true,
        lectures:{include:{lectures:{include:{coaching:{include:{user:{include:{avatar:true}}}},LectureHasWhatYouWillLearn:{include:{WhatYouWillLearn:true}}}}}},
        sessionHasPrerequire:{include:{prerequire:true}},
        SessionHasWhatYouWillLearn:{include:{WhatYouWillLearn:true}},
        sessionFeedback:{include:{User:{include:{avatar:true}}}},
        previousSesion:{include:{sessionFeedback:{include:{User:{include:{avatar:true}}}},tarifs:{include:{bookings:{include:{user:true}}}},MediaSession:{include:{media:true}}}},
        tarifs:{include:{features:{include:{feature:true}},session:true,bookings:{include:{user:true}}}},
        cover:true,
        sessionType:{include:{sessiontype:true}},
        MediaSession:{include:{media:true}}
       
        
      }
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

