import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingBookingService } from './trainingBooking.service';
import { CreateTrainingBookingDto } from './dto/create-TrainingBooking.dto';
import { UpdateTrainingBookingDto } from './dto/update-TrainingBooking.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('TrainingBooking')
@Controller('trainingBooking')
export class TrainingBookingController {
  constructor(private readonly trainingBookingService: TrainingBookingService) {}

  @Post()
  create(@Body() dto: CreateTrainingBookingDto) {
    return this.trainingBookingService.create(dto);
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
