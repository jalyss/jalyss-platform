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
import { ClientPaymentService } from './clientPayment.service';
import { CreateClientPaymentDto } from './dto/create-ClientPayment.dto';
import { UpdateClientPaymentgDto } from './dto/update-ClientPayment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('ClientPayment')
@Controller('clientPayment')
export class ClientPaymentController {
  constructor(private readonly userPaymentService: ClientPaymentService) {}
  @UseGuards()
  @Post()
  create(@Body() dto: CreateClientPaymentDto, @CurrentUser() user:any) {
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
    @Param('clientPaymentId') userPaymentId: string,
    @Body() dto: UpdateClientPaymentgDto,
  ) {
    return this.userPaymentService.update(userPaymentId, dto);
  }

  @Delete(':userPaymentId')
  remove(@Param('userPaymentId') userPaymentId: string) {
    return this.userPaymentService.remove(userPaymentId);
  }
}
