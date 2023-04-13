import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
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

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.workSpacesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateWorkSpaceDto: UpdateWorkSpaceDto) {
//     return this.workSpacesService.update(+id, updateWorkSpaceDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.workSpacesService.remove(+id);
//   }
}
