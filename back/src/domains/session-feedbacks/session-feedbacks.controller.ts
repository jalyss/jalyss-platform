import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionFeedbacksService } from './session-feedbacks.service';
import { CreateSessionFeedbackDto } from './dto/create-session-feedback.dto';
import { UpdateSessionFeedbackDto } from './dto/update-session-feedback.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('session-feedbacks')

@Controller('session-feedbacks')
export class SessionFeedbacksController {
  constructor(private readonly sessionFeedbacksService: SessionFeedbacksService) {}

  @Post()
  create(@Body() createSessionFeedbackDto: CreateSessionFeedbackDto) {
    return this.sessionFeedbacksService.create(createSessionFeedbackDto);
  }

  @Get()
  findAll() {
    return this.sessionFeedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionFeedbacksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionFeedbackDto: UpdateSessionFeedbackDto) {
    return this.sessionFeedbacksService.update(id, updateSessionFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionFeedbacksService.remove(id);
  }
}
