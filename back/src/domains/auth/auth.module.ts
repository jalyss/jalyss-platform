import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

import { MailService } from 'src/domains/mail/mail.service';
import { MailerModule, MAILER_OPTIONS } from '@nestjs-modules/mailer/dist';
import { MailModule } from '../mail/mail.module';
import { EmployeeService } from '../employee/employee.service';


@Module({
  imports: [
    
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,UsersService,JwtStrategy,MailService,EmployeeService],
  exports: [
    PassportModule,
    JwtModule
  ],
})
export class AuthModule {}
