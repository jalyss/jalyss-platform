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
import { ApiTags } from '@nestjs/swagger';
import { ChatRoomService } from './chatRoom.service';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { UpdateChatDto } from './dto/update-chatRoom.dto';
import { CurrentUser } from '../auth/decorators/currentUser';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('chatRoom')
@Controller('chatRoom')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatRoomDto, @CurrentUser() user: any) {
    return this.chatRoomService.create(createChatDto, user.id);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.chatRoomService.findAll(userId);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.chatRoomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatRoomService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatRoomService.remove(id);
  }
}
