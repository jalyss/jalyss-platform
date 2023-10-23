import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountCodesService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Discount Codes')
@Controller('discount-codes')
export class DicountCodesController {
  constructor(private readonly service: DiscountCodesService) {}

  @Post()
  create(@Body() createProviderDto: CreateDiscountCodeDto) {
    return this.service.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':params')
  findOne(@Param('params') params: string) {
    return this.service.findOne(params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateDiscountCodeDto) {
    return this.service.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
