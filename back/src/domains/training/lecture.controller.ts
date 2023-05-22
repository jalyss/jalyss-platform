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
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-Lecture.dto';
import { UpdateLectureDto } from './dto/update-Lecture.dto';

@ApiTags('Lecture')
@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  create(@Body() dto: CreateLectureDto) {
    return this.lectureService.create(dto);
  }

  @Get()
  findAll() {
    return this.lectureService.findAll();
  }

  @Get(':lectureId')
  findOne(@Param('id') lectureId: string) {
    return this.lectureService.findOne(lectureId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLecturetDto: UpdateLectureDto) {
    return this.lectureService.update(id, updateLecturetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureService.remove(id);
  }
}
