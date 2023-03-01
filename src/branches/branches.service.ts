import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma:PrismaService){

  }
  create(createBranchDto: CreateBranchDto) {
    return 'This action adds a new branch';
  }

  findAll() {
    return `This action returns all branches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
  async findBranchByIdOrIdentifier(id: string) {
    return await this.prisma.branch.findFirstOrThrow({
      where: {
        OR: [{ identifier: String(id) }, { id: String(id) }],
      },
    });
  }
}
