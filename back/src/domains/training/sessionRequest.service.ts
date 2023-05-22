import { Injectable } from '@nestjs/common';
import { CreateSessionRequestDto } from './dto/create-SessionRequest.dto';
import { UpdateSessionRequestDto } from './dto/update-SessionRequest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionRequestService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateSessionRequestDto) {
    return await this.prisma.sessionRequest.create({
      data : { 
        ...dto
      }
    })
  }

 async findAll() {
    return await this.prisma.sessionRequest.findMany({
      include : {
        user : true 
      }
    })
  }

 async findOne(id: string) {
    return await this.prisma.sessionRequest.findUnique({
      where : {id}
    })
  }

 async update(id: string, dto: UpdateSessionRequestDto) {
    return await this.prisma.sessionRequest.update({
      where : {id},
      data : dto,
    })
  }

  async remove(id: string) {
    return await this.prisma.sessionRequest.delete({
      where : {id}
    })
  }
}
