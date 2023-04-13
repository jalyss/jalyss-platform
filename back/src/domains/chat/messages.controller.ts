import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';


@ApiTags('Messages')
@Controller('Messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
    return this.messagesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
