import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
@ApiTags('cities')
@Controller('cities/')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) { }

  @Post()
  create(@Body() createCiteDto: CreateCityDto) {
    return this.citiesService.create(createCiteDto);
  }

  @Get(':countryId')
  findAll(
    @Param('countryId') countryId:string
  ) {
    return this.citiesService.findAll(countryId);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @Get()
  findAllCitites() {
    return this.citiesService.findAllCitites();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiteDto: UpdateCityDto) {
    return this.citiesService.update(id, updateCiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesService.remove(id);
  }
}
