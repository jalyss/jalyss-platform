import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FormatLogin, UsersService } from '../users/users.service';
import {
  EmployeeService,
  FormatLoginAdmin,
} from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { User } from '@prisma/client';
import { Employee } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/domains/users/dto/create-user.dto';
import { UserLogin } from 'src/domains/users/entities/user.entity';
import { EmployeeLogin } from '../employee/entities/employee.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/domains/mail/mail.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Socket } from 'socket.io';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FunctionalArea } from './../functional-areas/entities/functional-area.entity';

@Injectable()
export class AuthService {
  private connectedUsers: { [userId: string]: Socket } = {};
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly nodeMailerService: MailService,
    private readonly employeeService: EmployeeService,
  ) {}
  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.create(userDto);
      console.log(status.data);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: UserLogin): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);
    if (!user.isClient) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // generate and sign token
    const token = this._createToken(user);

    return token;
    // data: user
  }
  //////////////:admin auth
  async loginAdmin(dto: UserLogin): Promise<any> {
    const user = await this.usersService.findByLogin(dto);
    if (user.isClient) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    const token = this._createToken(user);

    return token;
  }

  async meAdmin(tokenAdmin: string) {
    const payload = this.jwtService.decode(tokenAdmin, {}) as any;
    return new Promise((resolve, reject) => {
      resolve(payload);
    });
  }
  //////////////////
  private _createToken(args: FormatLogin): any {
    const user: FormatLogin = args;
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async me(token: string) {
    const payload = this.jwtService.decode(token, {}) as any;
    return new Promise((resolve, reject) => {
      resolve(payload);
    });
  }
  async forgotPassword(email: string) {
    let result = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (result) {
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 9);
      }

      await this.prisma.user.update({
        data: {
          confirmkey: code,
        },
        where: {
          email: result.email,
        },
      });
      return {
        ...(await this.nodeMailerService.mailForgotPassword(email, code)),
        message: 'check ur mail',
      };
    }
  }
  async verificationCode(code: string, email: string) {
    const result = await this.prisma.user.findUnique({
      where: { email },
      include: { avatar: true, client: true, employee: true },
    });
    console.log(result);

    if (result?.confirmkey === code) {
      const { password: p, confirmkey: k, ...rest } = result;
      const token = await this._createToken(rest);
      return token;
    } else {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
  async changePassword(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    if (confirmPassword === password) {
      const result = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (email) {
        const salt = await bcrypt.genSalt();
        const user = await this.prisma.user.update({
          where: { id: result.id },
          data: { password: await bcrypt.hash(password, salt) },
        });
        const { password: p, confirmkey: k, ...rest } = user;
        return rest;
      }
    } else {
      throw new HttpException('passwords not match ', HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: string, dto: UpdateAuthDto) {
    const { fullNameEn, fullNameAr, email, client, avatarId } = dto;
    console.log(client, 'log');

    let data = {};
    const user = await this.prisma.$transaction(async (prisma) => {
      if (fullNameAr) {
        data = { ...data, fullNameAr };
      }
      if (fullNameEn) {
        data = { ...data, fullNameEn };
      }
      if (email) {
        data = { ...data, email };
      }
      if (avatarId) {
        data = { ...data, avatarId };
      }

      const auxUser = await prisma.user.update({
        where: { id },
        data,
        include: { avatar: true, client: true, employee: true },
      });
      if (client?.address) {
        data = { ...data, address: client?.address };
      }
      if (client?.tel) {
        data = { ...data, tel: client?.tel };
      }
      if (client?.country) {
        data = { ...data, countryId: client?.country?.id };
      }
      if (client?.city) {
        data = { ...data, cityId: client?.city?.id };
      }
      if (client?.educationLevel) {
        data = {
          ...data,
          educationLevelId: client?.educationLevel?.id,
        };
      }
      if (client?.functionalArea) {
        data = {
          ...data,
          functionalAreaId: client?.functionalArea?.id,
        };
      }
      if (client?.jobTitle) {
        data = { ...data, jobTitleId: client?.jobTitle?.id };
      }

      const auxClient = await prisma.client.update({
        where: { id: auxUser.clientId },
        data,
      });
      return await prisma.user.findFirst({
        where: { id },
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
    });

    return this._createToken(user);
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
