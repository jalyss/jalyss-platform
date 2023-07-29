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
  Post,
  Delete,
  Patch
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { UpdatePasswordDto } from './entities/user.entity';
import { AuthService } from 'src/domains/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserIsCoach, UpdateUserStatusDto } from './dto/update-user.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('author-list')
  authorList(){
    return this.usersService.authorList()
  }
  @Post('create')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }



  @UseGuards(JwtAuthGuard)
  @ApiSecurity('Aaccess-key')
  @UseInterceptors(ClassSerializerInterceptor) 
  @Put('update/:id')
  public async updateUserStatus(@Param('id') id: string, @Body()
  updateUserStatusDto: UpdateUserStatusDto) {
    return await this.usersService
      .updateUserStatus(id, updateUserStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('apiKey')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('isActive/:id')
  public async updateUser(@Param('id') id: string, @Body()
  updateUserDto: UpdateUserDto) {
    return await this.usersService
      .update(id, updateUserDto,);
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
  @Put('isCoach/:id') 
  public async updateUserCoach(
    @Param('id') id: string,
    @Body() updateUserIsCoachDto: UpdateUserIsCoach,
  ) {
    return await this.usersService.updateUserCoach(id, updateUserIsCoachDto);
  }

}