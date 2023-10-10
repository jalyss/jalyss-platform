import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { BranchesService } from 'src/domains/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { filterEample } from './entities/command.entity';
import { FilterCommand } from './types';
import { CommandLine, PaymentType, Status } from '@prisma/client';

@Injectable()
export class CommandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchesService,
  ) {}
  async create(dto: CreateCommandDto, branchId: string) {
    // validateOrReject(dto);
    console.log(dto);
    const branch = await this.branchService.findBranchByIdOrIdentifier(
      branchId,
    );
    console.log(branchId, branch.id);
    let commandLines = [];
    let sum = 0;
    if (dto.hasDelivery) sum += 7;
    if (!dto.commandLine) {
      throw new HttpException("don't have items", HttpStatus.BAD_REQUEST);
    } else {
      commandLines = await Promise.all(
        dto.commandLine.map(async (elem) => {
          const articleByBranch = await this.prisma.articlesByBranch.findFirst({
            where: { id: elem.articleByBranchId },
          });
          let amount = elem.quantity * articleByBranch.price;
          sum += amount;
          return {
            articleByBranchId: elem.articleByBranchId,
            quantity: +elem.quantity,
            amount,
          };
        }),
      );
    }

    return await this.prisma.command.create({
      data: {
        totalAmount: sum,
        ...dto,
        branchId: branch.id,
        commandLine: { create: commandLines.map((elem) => elem) },
      },
    });
  }

  async findAllByUserId(clientId: string) {
    return await this.prisma.command.findMany({
      where: { clientId },
      include: {
        commandLine: true,
        branch: true,
      },
    });
  }

  async findAll() {
    return this.prisma.command.findMany({orderBy:{
      createdAt:'desc'
    }});
  }

  async findAllByBranchIdentifier(branchId: string, filters: FilterCommand) {
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
  async findAllByClientId(id: string) {
    return await this.prisma.command.findMany({
      where: { clientId: id },
      include: {
        commandLine: {
          include: { articleByBranch: { include: { article: true } } },
        },
        country: true,
        city: true,
        branch: {
          select: { name: true },
        },
      },
    });
  }
  async findOne(id: string) {
    return await this.prisma.command.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        commandLine: {
          include: { articleByBranch: { include: { article: true } } },
        },
        country: true,
        city: true,
        branch: {
          select: { name: true },
        },
      },
    });
  }

  async findAllCommandLIne() {
    return await this.prisma.commandLine.findMany({
      include: {
        articleByBranch: {
          include: { article: { include: { category: true } }, branch: true },
        },
      },
    });
  }

  async update(id: string, dto: UpdateCommandDto) {
    const branchId = (await this.prisma.command.findFirstOrThrow({
      where: {
        id,
      },
    }))!.branchId;
    console.log(branchId);

    const command = await this.findOne(id);
    let commandLines = [];
    let sum = 0;
    if (dto.hasDelivery) sum += 7;
    if (!dto.commandLine) {
      throw new HttpException("don't have items", HttpStatus.BAD_REQUEST);
    } else {
      commandLines = await Promise.all(
        dto.commandLine.map(async (elem) => {
          const articleByBranch = await this.prisma.articlesByBranch.findFirst({
            where: { id: elem.articleByBranchId },
          });
          let amount = +elem.quantity * articleByBranch.price;
          sum += amount;
          return {
            articleByBranchId: elem.articleByBranchId,
            quantity: elem.quantity,
            amount,
          };
        }),
      );
    }

    return await this.prisma.command.update({
      where: { id },
      data: {
        totalAmount: sum,
        ...dto,
        branchId,
        // must delete lines befor updated because maybe the quantity changed
        commandLine: {
          deleteMany: {
            commandId: id,
            articleByBranchId: {
              in: command.commandLine.map((l) => l.articleByBranchId),
            },
          },
          create: commandLines.map((elem) => elem),
        },
      },
    });
  }

  async updateConfirmStatus(id: string, dto: Status) {
    return await this.prisma.command.update({
      where: { id },
      data: { confirm: dto },
    });
  }
  async updatePaidStatus(id: string, dto: PaymentType) {
    return await this.prisma.command.update({
      where: { id },
      data: { paymentType: dto },
    });
  }
  async updateDeliveredStatus(id: string, dto: boolean) {
    return await this.prisma.command.update({
      where: { id },
      data: { delivered: dto },
    });
  }
  async remove(id: string) {
    return await this.prisma.command.delete({ where: { id } });
  }
}
