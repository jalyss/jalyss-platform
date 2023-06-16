import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';




@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, UpdateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }

}
