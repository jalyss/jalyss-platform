import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BranchesService } from 'src/domains/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { filterEample } from './entities/command.entity';
import { FilterCommand } from './types';

@Injectable()
export class CommandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchesService,
  ) {}
  async create(dto: CreateCommandDto, branchId: string) {
    const branch = await this.branchService.findBranchByIdOrIdentifier(
      branchId,
    );
    return await this.prisma.command.create({
      data: {
        ...dto,
        branchId: branch.id,
        commandLine: { create: dto.commandLine },
      },
    });
  }

  async findAll() {
    return await this.prisma.command.findMany({
      include: {
        commandLine: true,
      },
    });
  }

  async findAllByBranchIdentifier(
    branchId: string,
    filters: FilterCommand,
  ) {
    branchId = (await this.branchService.findBranchByIdOrIdentifier(branchId))!
      .id;
    let insideWhere = {};
    //controle query=> filters
    if (Object.entries(filters).length > 0) {
      console.log('=======> filter', filters);
      let errors = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (!filterEample[key]) {
          errors.push(key);
        }
        if (['lte', 'gte'].includes(key)) {
          insideWhere['date'] = {
            ...insideWhere['date'],
            [key]: value,
          };
        } else {
          insideWhere[key] = value;
        }
      });
      if (errors.length > 0) {
        throw new HttpException(
          errors.join(' ') + ' filter(s) name error',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.prisma.command.findMany({
      where: {
        ...insideWhere,
         branchId,
        
      },
      include: {
        commandLine: true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} command`;
  }

  update(id: string, updateCommandDto: UpdateCommandDto) {
    return `This action updates a #${id} command`;
  }

  remove(id: string) {
    return `This action removes a #${id} command`;
  }
}
