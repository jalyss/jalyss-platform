import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthService, PrismaService]
})
export class EmployeeModule {}
