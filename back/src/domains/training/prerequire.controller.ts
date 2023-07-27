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
import { PrerequireService } from './prerequire.service';
import { CreatePrerequireDto } from './dto/create-prerequire.dto';
import { UpdatePrerequireDto } from './dto/update-prerequire.dto';


  
  @ApiTags('prerequire')
  @Controller('prerequire')
  export class PrerequireController {
    constructor(private readonly prerequireService: PrerequireService) {}
  
    @Post()
    create(@Body() dto: CreatePrerequireDto) {
      return this.prerequireService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.prerequireService.findAll();
    }
  
   
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePrerequireDto: UpdatePrerequireDto) {
      return this.prerequireService.update(id,  updatePrerequireDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.prerequireService.remove(id);
    }
  }
  