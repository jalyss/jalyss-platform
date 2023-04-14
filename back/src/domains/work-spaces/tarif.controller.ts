import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
// import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTarifDto } from './dto/update-tarif.dto';




@ApiTags('tarifs')
@Controller('tarifs')
export class TarifController {
  constructor(private readonly tarifService: TarifService) {}

  @Post()
  create(@Body() dto: CreateTarifDto) {
    return this.tarifService.create(dto);
  }

  @Get()
  findAll() {
    return this.tarifService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.tarifService.findOne(id);
  }

 
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateTarifDto: UpdateTarifDto) {
    return this.tarifService.update(id, UpdateTarifDto);
  }

  @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tarifService.remove(id);
    }


}
