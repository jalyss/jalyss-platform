import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEducationLevelProposalDto } from './dto/create-education-levelProposal.dto';
import { UpdateEducationLevelProposalDto } from './dto/update-educationa-levelProposal.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Education Level Proposal')
@Injectable()
export class EducationLevelProposalsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateEducationLevelProposalDto) {
    return await this.prisma.proposalEducationLevel.create({
      data: {
        ...dto,
       
      },
    });
  }

  findAll() {
    return this.prisma.proposalEducationLevel.findMany({});
  }


  async findOne(id: string) {
    return await this.prisma.proposalEducationLevel.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateEducationLevelProposalDto) {
    return await this.prisma.proposalEducationLevel.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.proposalEducationLevel.delete({ where: { id } });
  }
}
