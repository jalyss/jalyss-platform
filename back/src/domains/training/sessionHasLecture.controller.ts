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
 
 import { SessionHasLectureService } from './sessionHasLecture.service';
import { CreateSessionHasLectureDto } from './dto/create-sessionHasLecture.dto';

  
  @ApiTags('SessionHasLecture')
  @Controller('SessionHasLecture')
  export class SessionHasLectureController {
    constructor(private readonly  SessionHasLectureService: SessionHasLectureService) {}
  
    @Post()
    create(@Body() dto: CreateSessionHasLectureDto) {
      return this.SessionHasLectureService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.SessionHasLectureService.findAll();
    }
  
    // @Get(':lectureId')
    // findOne(@Param('lectureId') lectureId: string) {
    //   return this.lectureService.findOne(lectureId);
    // }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateLecturetDto: UpdateLectureDto) {
    //   return this.lectureService.update(id, updateLecturetDto);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.lectureService.remove(id);
    // }
  }
  