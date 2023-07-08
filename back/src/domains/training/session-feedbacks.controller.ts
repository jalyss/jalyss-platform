import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SessionFeedbacksService } from './session-feedbacks.service';
import { CreateSessionFeedbackDto } from './dto/create-session-feedback.dto';
import { UpdateSessionFeedbackDto } from './dto/update-session-feedback.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/currentUser';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('session-feedbacks')

@Controller('session-feedbacks')
export class SessionFeedbacksController {
  constructor(private readonly sessionFeedbacksService: SessionFeedbacksService) {}
  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSessionFeedbackDto: CreateSessionFeedbackDto,@CurrentUser() user:any) {
    return this.sessionFeedbacksService.create(createSessionFeedbackDto,user.id);
  }

  @Get()
  findAll() {
    return this.sessionFeedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionFeedbacksService.findBySessionId(id);
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
