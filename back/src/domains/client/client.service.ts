import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FilterClient } from './types';
import { skip } from 'rxjs';

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: {
          ...dto,
        },
      });
    } catch(e) {
      // Adding the service name/function name to easily find the error location while testing or debugging :)
      throw new CustomError(`ClientsService/create() & error: " + ${e}`);
    }
  }

  findAll(filters: FilterClient) {
    let where = {};
    let skip = 0;
    let take = 10;
    if (filters.skip) skip = +filters.skip;
    if (filters.take) take = +filters.take;
    if (filters.fullNameEn)
      where['fullNameEn'] = {
        contains: filters.fullNameEn,
      };

    try {
      return this.prisma.client.findMany({
        include: {
          avatar: true,
          country: true,
          category: true,
          city: true,
          jobTitle: true,
          functionalArea: true,
        },
        orderBy: { createdAt: 'asc' },
        where,
        skip,
        take,
      });
    } catch(e) {
      // Adding the service name/function name to easily find the error location while testing or debugging :)
      throw new CustomError(`ClientsService/create() & error: " + ${e}`);
    }
    
  }

  async findOne(id: string) {
    try {
      return await this.prisma.client.findFirst({
        where: {
          id,
        },
        include: {
          avatar: true,
          country: true,
          category: true,
          city: true,
          jobTitle: true,
          functionalArea: true,
        },
        orderBy: { createdAt: 'asc' },
      });
    } catch(e) {
      // Adding the service name/function name to easily find the error location while testing or debugging :)
      throw new CustomError(`ClientsService/findOne() & error: " + ${e}`);
    }
  }

  async update(id: string, dto: UpdateClientDto) {
    try {
      return await this.prisma.client.update({ where: { id }, data: dto });
    } catch(e) {
      // Adding the service name/function name to easily find the error location while testing or debugging :)
      throw new CustomError(`ClientsService/update() & error: " + ${e}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.client.delete({ where: { id } });
    } catch(e) {
      // Adding the service name/function name to easily find the error location while testing or debugging :)
      throw new CustomError(`ClientsService/remove() & error: " + ${e}`);
    }
  }
}
