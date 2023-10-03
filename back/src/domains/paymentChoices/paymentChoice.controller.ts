import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentChoicesService } from './paymentChoice.service';
import { CreatePaymentChoiceDto } from './dto/create-paymentChoice.dto';
import { UpdatePaymentChoiceDto } from './dto/update-paymentChoice.dto';
@ApiTags('Payment Choice')
@Controller('payment-choices/')
export class PaymentChoicesController {
  constructor(private readonly citiesService: PaymentChoicesService) { }

  @Post()
  create(@Body()dto: CreatePaymentChoiceDto) {
    return this.citiesService.create(dto);
  }

  @Get('')
  findAll() {
    return this.citiesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentChoiceDto) {
    return this.citiesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesService.remove(id);
  }
}
