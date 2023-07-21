import { Injectable } from '@nestjs/common';
import { CreateSessionRequestDto, UpdateReqDto } from './dto/create-SessionRequest.dto';
import { UpdateSessionRequestDto } from './dto/update-SessionRequest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionRequestService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateSessionRequestDto,userId:string) {
    const {requestCategoriesIds,...rest}=dto
    return await this.prisma.sessionRequest.create({
      data : { 
        ...rest,
        userId,
        RequestCategories:{
          create:requestCategoriesIds.map((id)=>{
           return {
            categoryId : id,
           }
          })
   
         }
      }
    })
  }

 async findAll() {
    return await this.prisma.sessionRequest.findMany({
      include : {
        user :{include:{avatar:true}} ,
        resume:true,
        RequestCategories:{include:{ category:true}}

      }
    })
  }

 async findOne(id: string) {
    return await this.prisma.sessionRequest.findUnique({
      where : {id},
      include : {
        user :{include:{avatar:true}} ,
        resume:true,
        RequestCategories:{include:{ category:true}}

      }
    })
  }

 async update(id: string, dto: UpdateReqDto) {
    return await this.prisma.sessionRequest.update({
      where : {id},
      data :{...dto} ,
    })
  }

  async remove(id: string) {
    return await this.prisma.sessionRequest.delete({
      where : {id}
    })
  }
}
