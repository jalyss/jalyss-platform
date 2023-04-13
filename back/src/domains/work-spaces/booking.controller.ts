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
import { BookingService } from './booking.service';
  import { CreateBookingDto } from './dto/create-booking.dto';
//   import { UpdateCategoryDto } from './dto/update-category.dto';
  
  
  @ApiTags('bookings')
  @Controller('bookings')
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Post()
    create(@Body() dto: CreateBookingDto) {
      return this.bookingService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.bookingService.findAll();
    }
  
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.categoryService.findOne(id);
    // }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    //   return this.categoryService.update(id, dto);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.categoryService.remove(id);
    // }
  }
  