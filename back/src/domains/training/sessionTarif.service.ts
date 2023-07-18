import { Injectable } from '@nestjs/common';
import { CreateSessionTarifDto } from './dto/create-SessionTarif.dto';
import { UpdateSessionTarifDto } from './dto/update-SessionTarif.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SessionTarifService {
  constructor (private readonly prisma : PrismaService) {}
  async create(dto: CreateSessionTarifDto) {
    return await this.prisma.sessionTarif.create({
      data : {
        ...dto
      }
    })
  }

 async findAll() {
    return await this.prisma.sessionTarif.findMany({
      include : { 
        bookings : true ,
        session:true
      }
    });
  }

   async findOne(id: string) {
    return await this.prisma.sessionTarif.findUnique({
      where : {id}
    })
  }

  async update(id: string, dto: UpdateSessionTarifDto) {
    return await this.prisma.sessionTarif.update({
      where : {id} , 
      data : dto 
    });
  }

 async remove(id: string) {
    return await this.prisma.sessionTarif.delete({
      where : {id}
    })
  }
}
