import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobTitleProposalDto } from './dto/create-functional-areaProposal.dto';
import { UpdateJobTitleProposalDto } from './dto/update-functional-areaProposal.dto';


@Injectable()
export class JobTitleProposalsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateJobTitleProposalDto) {
    return await this.prisma.proposalJobTitle.create({
      data: {
        ...dto,
       
      },
    });
  }

  findAll() {
    return this.prisma.proposalJobTitle.findMany({});
  }


  async findOne(id: string) {
    return await this.prisma.proposalJobTitle.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateJobTitleProposalDto) {
    return await this.prisma.proposalJobTitle.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.proposalJobTitle.delete({ where: { id } });
  }
}
