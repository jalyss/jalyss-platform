import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientCategoryService } from './client-categories.service';
import { CreateCiteDto } from './dto/create.dto';
import { UpdateCiteDto } from './dto/update.dto';
@ApiTags('client-categories')
@Controller('client-categories')
export class ClientCategoryController {
  constructor(private readonly service: ClientCategoryService) { }

  @Post()
  create(@Body() createCiteDto: CreateCiteDto) {
    return this.service.create(createCiteDto);
  }

  @Get(':countryId')
  findAll(
    @Param('countryId') countryId:string
  ) {
    return this.service.findAll(countryId);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get()
  findAllCitites() {
    return this.service.findAllCitites();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiteDto: UpdateCiteDto) {
    return this.service.update(id, updateCiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
