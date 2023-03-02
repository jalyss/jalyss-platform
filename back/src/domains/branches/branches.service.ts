import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBranchDto) {
    return await this.prisma.branch.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.branch.findMany();
  }

  async findBranchByIdOrIdentifier(x: string) {
    return await this.prisma.branch.findFirstOrThrow({
      where: {
        OR: [{ identifier: String(x) }, { id: String(x) }],
      },
    });
  }

  async update(id: string, dto: UpdateBranchDto) {
    return await this.prisma.branch.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.branch.delete({
      where: {
        id,
      },
    });
  }
}
