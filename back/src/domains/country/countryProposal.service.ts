import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryProposalDto } from './dto/create-countryProposal.dto';
import { UpdateCountryProposalDto } from './dto/update-countryProposal.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Country Proposal')
@Injectable()
export class CountryProposalsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCountryProposalDto) {
    return await this.prisma.proposalCountry.create({
      data: {
        ...dto,
       
      },
    });
  }

  findAll() {
    return this.prisma.proposalCountry.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.proposalCountry.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateCountryProposalDto) {
    return await this.prisma.proposalCountry.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.proposalCountry.delete({ where: { id } });
  }
}
