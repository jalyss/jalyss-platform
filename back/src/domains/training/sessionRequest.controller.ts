import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SessionRequestService } from './sessionRequest.service';
import { UpdateSessionRequestDto } from './dto/update-SessionRequest.dto';
import { CreateSessionRequestDto, UpdateReqDto } from './dto/create-SessionRequest.dto';
import { CurrentUser } from '../auth/decorators/currentUser';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('SessionRequest')
@Controller('SessionRequest')
export class SessionRequestController {
  constructor(private readonly sessionRequestService: SessionRequestService) {}
  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSessionRequestDto: CreateSessionRequestDto,@CurrentUser() user:any) {
    return this.sessionRequestService.create(createSessionRequestDto,user.id);
  }

  @Get()
  findAll() {
    return this.sessionRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionRequestService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReqDto,
  ) {
    return this.sessionRequestService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionRequestService.remove(id);
  }
}
