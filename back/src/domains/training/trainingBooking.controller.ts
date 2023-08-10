import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrainingBookingService } from './trainingBooking.service';
import { CreateTrainingBookingDto } from './dto/create-TrainingBooking.dto';
import { UpdateTrainingBookingDto } from './dto/update-TrainingBooking.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/currentUser';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@ApiTags('TrainingBooking')
@Controller('trainingBooking')
export class TrainingBookingController {
  constructor(private readonly trainingBookingService: TrainingBookingService) {}

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTrainingBookingDto , @CurrentUser() user:any) {
    return this.trainingBookingService.create(dto,user.id);
  }

  @Get('/bySession/:sessionId')
  findAllBySession(@Param('sessionId') sessionId: string) {
    return this.trainingBookingService.findAllBySession(sessionId);
  }

  @Get('/byUser/:userId')
  findAllByuser(@Param('userId') userId: string) {
    return this.trainingBookingService.findAllByuser(userId);
  }

  @Get()
  findAll() {
    return this.trainingBookingService.findAll();
  }

  @Get(':trainingBooking')
  findOne(@Param('trainingBooking') trainingBooking: string) {
    return this.trainingBookingService.findOne(trainingBooking);
  }

  @Patch(':trainingBooking')
  update(@Param('trainingBooking') trainingBooking: string, @Body() dto:UpdateTrainingBookingDto) {
    return this.trainingBookingService.update(trainingBooking, dto);
  }

  @Delete(':trainingBooking')
  remove(@Param('trainingBooking') trainingBooking: string) {
    return this.trainingBookingService.remove(trainingBooking);
  }
}
