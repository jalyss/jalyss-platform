import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';




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

  @Post('images/:id')
  createImages(@Body() dto: string[], @Param('id') id: string) {
    return this.serviceService.createImages(id,dto)
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Delete('images/:serviceId/:mediaId')
  removeImage(@Param('serviceId') serviceId: string , @Param('mediaId') mediaId:string) {
    return this.serviceService.removeImage(serviceId,mediaId);
  }
}