import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/domains/auth/auth.service';
import { AuthModule } from 'src/domains/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService,PrismaService],
  imports: [PrismaModule],
})
export class UsersModule {}
