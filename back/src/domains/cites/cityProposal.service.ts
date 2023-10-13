import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityProposalDto } from './dto/create-cityProposal.dto';
import { UpdateCityProposalDto } from './dto/update-cityProposal.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('City Proposal')
@Injectable()
export class CityProposalsService {
  constructor(
    private readonly prisma: PrismaService,
) { }
  async create(dto: CreateCityProposalDto,countryId:string) {
    return await this.prisma.proposalCity.create({
      data: {
          ...dto,countryId
      },
  });
  }

  findAll(countryId:string) {
    return this.prisma.proposalCity.findMany({
      where:{countryId}
    });
  }
  findAllCitites() {
    return this.prisma.proposalCity.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.proposalCity.findFirst({
      where: {
          id,
      },
  });
  }

  async update(id: string, dto: UpdateCityProposalDto) {
    return await this.prisma.proposalCity.update({ where: { id }, data: dto });

  }

  async remove(id: string) {
    return await this.prisma.city.delete({ where: { id } });

  }
}
