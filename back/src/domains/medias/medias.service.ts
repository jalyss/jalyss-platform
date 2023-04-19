import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediasService {
  constructor(private readonly prisma:PrismaService){}
  create(data: CreateMediaDto) {
    return this.prisma.media.create({data});
  }
  async createMany(data: CreateMediaDto[]) {
    let files=[]
    await  Promise.all (data.map(async(elem)=>{
       const medias=await this.prisma.media.create({data:elem});
       files.push(medias)
    }))
    return files
  }

  findAll() {
    return this.prisma.media.findMany();
  }

  findOne(id: string) {
    return this.prisma.media.findUnique({where:{id}});
  }

  update(id: string, data: UpdateMediaDto) {
    return this.prisma.media.update({
      data,where:{id}
    });
  }

  remove(id: string) {
    return this.prisma.media.delete({where:{id}});
  }
}
