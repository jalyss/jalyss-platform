import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
// import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { ApiTags } from '@nestjs/swagger';




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
