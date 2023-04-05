import {
  Body,
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Request,
  Req,
  UseGuards,
  UseInterceptors,
  Headers,
  Post
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { UpdatePasswordDto } from './entities/user.entity';
import { AuthService } from 'src/domains/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('create')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }





  @UseGuards(JwtAuthGuard)
  @ApiSecurity('Aaccess-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(@Request() req, @Body()
  updatePasswordDto: UpdatePasswordDto) {
    await this.usersService
      .updatePassword(updatePasswordDto, req.user.id);
    return {
      message: "password_update_success"
    };
  }

}