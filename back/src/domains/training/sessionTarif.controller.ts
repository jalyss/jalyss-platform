import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionTarifService } from './sessionTarif.service';
import { CreateSessionTarifDto } from './dto/create-SessionTarif.dto';
import { UpdateSessionTarifDto } from './dto/update-SessionTarif.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('SessionTarif')
@Controller('sessionTarif')
export class SessionTarifController {
  constructor(private readonly sessionTarifService:SessionTarifService ) {}

  @Post()
  create(@Body() createSessionTarifDto:CreateSessionTarifDto ) {
    return this.sessionTarifService.create(createSessionTarifDto);
  }

  @Get()
  findAll() {
    return this.sessionTarifService.findAll();
  }

  @Get(':sessionTarifId')
  findOne(@Param('sessionTarifId') id: string) {
    return this.sessionTarifService.findOne(id);
  }

  // @Patch(':sessionTarifId')
  // update(@Param('sessionTarifId') id: string, @Body() dto:UpdateSessionTarifDto) {
  //   return this.sessionTarifService.update(id, dto);
  // }

  @Delete(':sessionTarifId')
  remove(@Param('sessionTarifId') id: string) {
    return this.sessionTarifService.remove(id);
  }
}
