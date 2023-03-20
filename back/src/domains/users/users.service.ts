import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto, UserLogin } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import { Media, MediaUser, User } from '@prisma/client';

export interface FormatLogin extends Partial<User> {
  id: string;
  fullNameEn: string;
  fullNameAr: string;
  email: string;
  address: string;
  tel: string;
  avatarId: string;
  createdAt: Date;
  updatedAt: Date;
  accountBalance: number;
  categoryId: string;
  educationLevelId: string;
  functionalAreaId: string;
  jobTitleId: string;
  Media: MediaUser[];
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
    });
  }
  // async signInAdmin(data: UserLogin) {
  //   const response = await this.prisma.user.findUniqueOrThrow({ where: { email: data.email } });
  //   if (!response) {
  //     throw new HttpException("invalid_credentials",
  //       HttpStatus.UNAUTHORIZED);
  //   }
  //   const isMatch = await bcrypt.compare(data.password, response.password);
  //   if (!isMatch) {
  //     throw new HttpException("invalid_credentials",
  //       HttpStatus.UNAUTHORIZED);
  //   }
  //   delete response.password
  //   if (isMatch && response.role === 'admin')
  //     return response;
  //   else throw 'Rmail or password is incorrect'
  // }
  // async login(data: UserLogin) {
  //   const response = await this.prisma.user.findUniqueOrThrow({ where: { email: data.email } });
  //   const isMatch = await bcrypt.compare(data.password, response.password);
  //   delete response.password
  //   if (isMatch)
  //     return response;
  //   else throw 'email or password is incorrect'
  // }

  findAll() {
    return this.prisma.user.findMany({
      include: { Media: true },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id: id } });
  }

  update(id: string, data: UpdateUserDto) {
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
        avatar:true
      },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
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
