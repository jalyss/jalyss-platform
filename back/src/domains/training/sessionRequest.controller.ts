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
import { SessionRequestService } from './sessionRequest.service';
import { UpdateSessionRequestDto } from './dto/update-SessionRequest.dto';
import { CreateSessionRequestDto } from './dto/create-SessionRequest.dto';

@ApiTags('SessionRequest')
@Controller('SessionRequest')
export class SessionRequestController {
  constructor(private readonly sessionRequestService: SessionRequestService) {}

  @Post()
  create(@Body() createSessionRequestDto: CreateSessionRequestDto) {
    return this.sessionRequestService.create(createSessionRequestDto);
  }

  @Get()
  findAll() {
    return this.sessionRequestService.findAll();
  }

  @Get(':sessionId')
  findOne(@Param('id') id: string) {
    return this.sessionRequestService.findOne(id);
  }

  @Patch(':sessionId')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSessionRequestDto,
  ) {
    return this.sessionRequestService.update(id, dto);
  }

  @Delete(':sessionId')
  remove(@Param('id') id: string) {
    return this.sessionRequestService.remove(id);
  }
}
