import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserPaymentService } from './userPayment.service';
import { CreateUserPaymentDto } from './dto/create-UserPayment.dto';
import { UpdateUserPaymentgDto } from './dto/update-UserPayment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('UserPayment')
@Controller('userPayment')
export class UserPaymentController {
  constructor(private readonly userPaymentService: UserPaymentService) {}
  @UseGuards()
  @Post()
  create(@Body() dto: CreateUserPaymentDto, @CurrentUser() user:any) {
    return this.userPaymentService.create(dto, user.clientId);
  }

  @Get()
  findAll() {
    return this.userPaymentService.findAll();
  }

  @Get(':userPaymentId')
  findOne(@Param('userPaymentId') userPaymentId: string) {
    return this.userPaymentService.findOne(userPaymentId);
  }

  @Patch(':userPaymentId')
  update(
    @Param('userPaymentId') userPaymentId: string,
    @Body() updateUserPaymentDto: UpdateUserPaymentgDto,
  ) {
    return this.userPaymentService.update(userPaymentId, updateUserPaymentDto);
  }

  @Delete(':userPaymentId')
  remove(@Param('userPaymentId') userPaymentId: string) {
    return this.userPaymentService.remove(userPaymentId);
  }
}
