import { Injectable } from '@nestjs/common';

import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkSpaceDto } from './dto/create-work-space.dto';
@Injectable()
export class WorkSpacesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWorkSpaceDto) {
    return await this.prisma.workSpace.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.workSpace.findMany({
      include: { 
        image: true,
        MediaWorkSpace:{
          include:{
            media:true

          }
          }
         },
    });
  }

  async findOne(id: string) {
    return await this.prisma.workSpace.findFirst({
      where: {
        id,
      },
      include: { 
        image: true,
        MediaWorkSpace:{
          include:{
            media:true

          }
          }
         },
    });
  }

  async update(id: string, dto: UpdateWorkSpaceDto) {
    return await this.prisma.workSpace.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.workSpace.delete({ where: { id } });
  }

  async createImages(id: string, dto: string[]) {
    return await this.prisma.mediaWorkSpace.createMany({
      data: dto.map((elem) => ({
        mediaId: elem,
        workspaceId: id,
      })),
    });
  }
}
