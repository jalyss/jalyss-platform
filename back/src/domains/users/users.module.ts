import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/domains/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { EmployeeService } from '../employee/employee.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService,PrismaService,MailService,EmployeeService],
  imports: [],
})
export class UsersModule {}
