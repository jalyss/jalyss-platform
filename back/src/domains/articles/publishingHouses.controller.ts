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
import { PublishingHouseService } from './publishingHouses.service';
import { CreatePublishingHouseDto } from './dto/create-publishingHouse.dto';
import { UpdatePublishingHouseDto } from './dto/update-publishingHouse.dto';


@ApiTags('publishing Houses')
@Controller('publishing-houses')
export class PublishingHouseController {
  constructor(private readonly service: PublishingHouseService) {}

  @Post('')
  create(
    @Body() dto: CreatePublishingHouseDto,
   ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePublishingHouseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
