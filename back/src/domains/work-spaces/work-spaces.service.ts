import { Injectable } from '@nestjs/common';
import { CreateWorkSpaceDto } from './dto/create-work-space.dto';
import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkSpacesService {
  constructor(private prisma: PrismaService) {}


  create(createWorkSpaceDto: CreateWorkSpaceDto) {
    return 'This action adds a new workSpace';
  }

  findAll() {
    return 'This action adds a new workSpace';
  }

  findOne(id: number) {
    return `This action returns a #${id} workSpace`;
  }

  update(id: number, updateWorkSpaceDto: UpdateWorkSpaceDto) {
    return `This action updates a #${id} workSpace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workSpace`;
  }
}
