
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeLogin } from '../employee/entities/employee.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Employee } from '@prisma/client';

export interface FormatLoginAdmin extends Partial<Employee> {
  id: string;
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  address: string;
  tel: string;
  isAdmin: boolean;
  branchId: string;
  roleId: string;
}

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateEmployeeDto) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.employee.create({
      data,
    });

  }

  async findByLogin({ email, password }: EmployeeLogin) {
    const emlpoyee = await this.prisma.employee.findFirst({
      where: { email }
    });
    if (!emlpoyee) {
      throw new HttpException('invalid_credentials', HttpStatus.BAD_REQUEST);
    }
    const areEqual = await bcrypt.compare(password, emlpoyee.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.BAD_REQUEST);
    }

    const { password: p, ...rest } = emlpoyee;
    return rest;
  }

  async signInAdmin(data: EmployeeLogin) {
    const response = await this.prisma.employee.findUniqueOrThrow({ where: { email: data.email } });
    if (!response) {
      throw new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED);
    }
    const isMatch = await bcrypt.compare(data.password, response.password);
    if (!isMatch) {
      throw new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED);
    }
    delete response.password
    if (isMatch && response.isAdmin === true)
      return response;

  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findOne(id: string) {
    return this.prisma.employee.findUniqueOrThrow({ where: { id: id } });
  }

  update(id: string, data: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
