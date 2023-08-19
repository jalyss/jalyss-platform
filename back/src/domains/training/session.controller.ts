import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-Session.dto';
import { UpdateSessionDto } from './dto/update-Session.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterSession } from './entities/training.entity';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.create(dto);
  }

  @Get(':take/:skip')
  findAll(@Query() filters:FilterSession ,
  @Param('take') take: number,
    @Param('skip') skip: number
  
  ) {
    return this.sessionService.findAll(filters,+take,+skip);
  }

  @Get(':sessionId')
  findOne(@Param('sessionId') sessionId: string) {
    return this.sessionService.findOne(sessionId);
  }

  // @Get()
  // findAllSessionTitles() {
  //   return this.sessionService.findAllSessionTitles();
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.sessionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(id);
  }

  // Session Medias
  @Post('media/:id')
  createSessionMedia(@Body() dto: string[],@Param('id') id:string ) {
    return this.sessionService.createSessionMedia(id,dto);
  }
}
