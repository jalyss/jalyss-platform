import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import {
  UpdateUserDto,
  UpdateUserIsCoach,
  UpdateUserStatusDto,
} from './dto/update-user.dto';
import { UpdatePasswordDto, UserLogin } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { Client, Employee, Media, User } from '@prisma/client';

export interface FormatLogin extends Partial<User> {
  id: string;
  fullNameEn: string;
  fullNameAr: string;
  isClient: boolean;
  clientId: string;
  employeeId: string;
  email: string;
  avatarId: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: Media;
  client: Client;
  employee: Employee;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const { tel, address, ...rest } = dto;
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);
    return await this.prisma.$transaction(async (prisma) => {
      let data = {
        fullNameAr: dto.fullNameAr,
        fullNameEn: dto.fullNameEn,
        tel: tel,
        address: address,
        email: dto.email,
      };
      if (dto.avatarId) data['avatarId'] = dto.avatarId;
      if (dto.isClient) {
        const client = await prisma.client.create({
          data,
        });
        const user = await prisma.user.create({
          data: {
            ...rest,
            password: dto.password,
            clientId: client.id,
          },
        });
        return user;
      } else {
        const employee = await prisma.employee.create({
          data,
        });
        const user = await prisma.user.create({
          data: {
            ...rest,
            isClient: false,
            password: dto.password,
            employeeId: employee.id,
          },
        });
        return user;
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { Media: true, avatar: true, client: true },
    });
  }

  authorList() {
    return this.prisma.user.findMany({
      where: {
        Blog: {
          some: {
            confirm: 'confirmed',
          },
        },
      },

      select: { fullNameEn: true, fullNameAr: true, id: true, avatar: true },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
      include: {
        avatar: true,
        client: {
          include: {
            country: true,
            city: true,
            functionalArea: true,
            jobTitle: true,
            educationLevel: true,
          },
        },
      },
    });
    const { confirmkey, password, ...rest } = user;
    return rest;
  }

  async update(id: string, data: UpdateUserDto) {
    const {
      tel,
      address,
      countryId,
      cityId,
      clientId,
      educationLevelId,
      jobTitleId,
      ...rest
    } = data;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        fullNameAr: data.fullNameAr,
        fullNameEn: data.fullNameEn,
        email: data.email,
      },
    });

    if (clientId) {
      await this.prisma.client.update({
        where: { id: clientId },
        data: {
          ...rest,
          tel,
          address,
          countryId,
          cityId,
          educationLevelId,
          jobTitleId,
        },
      });
    }

    return updatedUser;
  }

  updateUserStatus(id: string, data: UpdateUserStatusDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  updateUserCoach(id: string, data: UpdateUserIsCoach) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByLogin({ email, password }: UserLogin): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        Media: true,
        avatar: true,
        client: {
          include: {
            country: true,
            city: true,
            functionalArea: true,
            jobTitle: true,
            educationLevel: true,
          },
        },
        employee: true,
      },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.BAD_REQUEST);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.BAD_REQUEST);
    }

    const { password: p, confirmkey: k, ...rest } = user;
    return rest;
  }

  async findByPayload({ email }: any): Promise<any> {
    let user = {};
    user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user)
      user = await this.prisma.employee.findFirst({
        where: { email },
      });
    return user;
  }

  async updatePassword(payload: UpdatePasswordDto, id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await bcrypt.compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    const salt = await bcrypt.genSalt();
    return await this.prisma.user.update({
      where: { id },
      data: { password: await bcrypt.hash(payload.new_password, salt) },
    });
  }
}
