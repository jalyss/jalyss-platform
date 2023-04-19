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
import { CoachingService } from './coaching.service';
import { CreateCoachingDto } from './dto/create-Coaching.dto';
import { UpdateCoachingDto } from './dto/update-Coaching.dto';

@ApiTags('Coaching')
@Controller('coaching')
export class CoachingController {
  constructor(private readonly coachingService: CoachingService) {}

  @Post()
  create(@Body() createCoachingDto: CreateCoachingDto) {
    return this.coachingService.create(createCoachingDto);
  }

  @Get()
  findAll() {
    return this.coachingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoachingDto: UpdateCoachingDto,
  ) {
    return this.coachingService.update(id, updateCoachingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachingService.remove(id);
  }
}
