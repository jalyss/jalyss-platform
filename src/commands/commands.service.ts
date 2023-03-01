import { Injectable } from '@nestjs/common';
import { BranchesService } from 'src/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

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
        CommandLine: { create: dto.commandLine },
      },
    });
  }

  async findAll() {
    return await this.prisma.command.findMany({
      include: {
        CommandLine: true,
      },
    });
  }

  async findAllByBranchIdentifier(branchIdentifier: string) {
    return await this.prisma.command.findMany({
      where: {
        branch: {
          identifier: branchIdentifier,
        },
      },
      include: {
        CommandLine: true,
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
