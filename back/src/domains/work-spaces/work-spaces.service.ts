import { Injectable } from '@nestjs/common';
import { CreateWorkSpaceDto } from './dto/create-work-space.dto';
import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class WorkSpacesService {
  constructor(
    private readonly prisma: PrismaService,

  ) { }


  async create(dto:CreateWorkSpaceDto) {
    return await this.prisma.workSpace.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.workSpace.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.workSpace.findFirst({
        where: {
            id,
        },
    });

}

async update(id: string, dto: UpdateWorkSpaceDto) {
  return await this.prisma.workSpace.update({ where: { id }, data: dto });
}

async remove(id: string) {
  return await this.prisma.workSpace.delete({ where: { id } });
}

}
