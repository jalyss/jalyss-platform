import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FunctionalAreasService } from './functional-areas.service';
import { CreateFunctionalAreaDto } from './dto/create-functional-area.dto';
import { UpdateFunctionalAreaDto } from './dto/update-functional-area.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('functional-areas')
@Controller('functional-areas')
export class FunctionalAreasController {
  constructor(private readonly functionalAreasService: FunctionalAreasService) {}

  
  @Post()
  create(@Body() dto: CreateFunctionalAreaDto) {
    return this.functionalAreasService.create(dto);
  }

  @Get()
  findAll() {
    return this.functionalAreasService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.functionalAreasService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFunctionalAreaDto: UpdateFunctionalAreaDto) {
  //   return this.functionalAreasService.update(+id, updateFunctionalAreaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.functionalAreasService.remove(+id);
  // }
}