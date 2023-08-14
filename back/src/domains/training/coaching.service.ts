import { Injectable } from '@nestjs/common';
import { CreateCoachingDto } from './dto/create-Coaching.dto';
import { UpdateCoachingDto } from './dto/update-Coaching.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CoachingService {
  constructor ( private readonly prisma : PrismaService) {}
   async create(dto:CreateCoachingDto ) {
    return await this.prisma.coaching.create(
      {
        data : {
          ...dto
        }
      }
    )
  }

  async findAll() {
    return await this.prisma.coaching.findMany({
      include : {user:{include:{avatar:true}}}
    })
  }

async  findOne(id: string) {
    return await this.prisma.coaching.findUnique({
      where : { id },
      include : { lecture : true , user: true }
    })
  }

 async update(id: string, dto:UpdateCoachingDto ) {
    return await this.prisma.coaching.update({
      where : { id },
      data : dto
    })
  }

 async remove(id: string) {
    return await this.prisma.coaching.delete({where : {id}})
  }
}

