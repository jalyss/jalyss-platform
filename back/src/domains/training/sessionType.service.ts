import { Injectable } from '@nestjs/common';
import { CreateSessionTypefDto } from './dto/create-SessionType.dto';
import { UpdateSessionTypeDto } from './dto/update-SessionType.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SessionTypeService {
  constructor(private readonly prisma : PrismaService) {}
  async create(dto: CreateSessionTypefDto ) {
    return await this.prisma.sessionType.create({
      data : {
        ...dto
      }
    })
  }

  async findAll() {
    return await this.prisma.sessionType.findMany({
      include : {
        sessions : true 
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.sessionType.findUnique({
      where : {id} , 
      include : {
        sessions : true 
      }
    })
  }

 async  update(id: string, dto: UpdateSessionTypeDto ) {
    return await this.prisma.sessionType.update({
      where : {id}, 
      data : dto 
    });
  }

  async remove(id: string) {
    return await this.prisma.sessionType.delete({
      where : {id},
    });
  }
}
