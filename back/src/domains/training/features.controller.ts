import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  
  import { ApiTags } from '@nestjs/swagger';
  
import { FeaturesService } from './features.service';
import { CreateFeaturesDto } from './dto/create-features.dto';
import { UpdateFeaturesDto } from './dto/update-features.dto';
  
  @ApiTags('features')
  @Controller('features')
  export class FeaturesController {
    constructor(private readonly featuresService: FeaturesService) {}
  
    @Post()
    create(@Body() dto: CreateFeaturesDto) {
      return this.featuresService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.featuresService.findAll();
    }
  
    // @Get(':id')
    // findOne(@Param('id') lectureId: string) {
    //   return this.featuresService.findOne(id);
    // }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFeaturesDto: UpdateFeaturesDto) {
      return this.featuresService.update(id,  updateFeaturesDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.featuresService.remove(id);
    }
  }
  