import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { roleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [EmployeeController,roleController],
  providers: [EmployeeService, AuthService, PrismaService,JwtService,UsersService,MailService,RoleService]
})
export class EmployeeModule {}
