import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFunctionalAreaProposalDto } from './dto/create-functional-areaProposal.dto';
import { UpdateFunctionalAreaProposalDto } from './dto/update-functional-areaProposal.dto';


@Injectable()
export class FunctionalAreaProposalsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateFunctionalAreaProposalDto) {
    return await this.prisma.proposalFunctionalArea.create({
      data: {
        ...dto,
       
      },
    });
  }

  findAll() {
    return this.prisma.proposalFunctionalArea.findMany({});
  }


  async findOne(id: string) {
    return await this.prisma.proposalFunctionalArea.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateFunctionalAreaProposalDto) {
    return await this.prisma.proposalFunctionalArea.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.proposalFunctionalArea.delete({ where: { id } });
  }
}
