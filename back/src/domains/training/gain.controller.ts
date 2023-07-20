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
import { GainService } from './gain.service';
import { CreateGainDto } from './dto/create-gain.dto';
import { UpdateGainDto } from './dto/update-gain.dto';
  

  
  @ApiTags('gains')
  @Controller('gains')
  export class GainController {
    constructor(private readonly gainService: GainService) {}
  
    @Post()
    create(@Body() dto: CreateGainDto) {
      return this.gainService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.gainService.findAll();
    }
  
   
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGainDto: UpdateGainDto) {
      return this.gainService.update(id,  updateGainDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.gainService.remove(id);
    }
  }
  