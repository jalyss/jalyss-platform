import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionTypeService } from './sessionType.service';
import { CreateSessionTypefDto } from './dto/create-SessionType.dto';
import { UpdateSessionTypeDto } from './dto/update-SessionType.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SessionType')
@Controller('sessionType')
export class SessionTypeController {
  constructor(private readonly sessionTypeService: SessionTypeService) {}

  @Post()
  create(@Body() createSessionTypeDto: CreateSessionTypefDto) {
    return this.sessionTypeService.create(createSessionTypeDto);
  }

  @Get()
  findAll() {
    return this.sessionTypeService.findAll();
  }

  @Get(':sessionTypeId')
  findOne(@Param('id') id: string) {
    return this.sessionTypeService.findOne(id);
  }

  @Patch(':sessionTypeId')
  update(@Param('sessionTypeId') sessionTypeId: string, @Body() dto:UpdateSessionTypeDto) {
    return this.sessionTypeService.update(sessionTypeId, dto);
  }

  @Delete(':sessionTypeId')
  remove(@Param('sessionTypeId') sessionTypeId: string) {
    return this.sessionTypeService.remove(sessionTypeId);
  }
}
