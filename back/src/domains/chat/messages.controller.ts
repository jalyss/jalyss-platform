import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  // @UseGuards(JwtAuthGuard)
  @Post(':chatRoomId/:userId')
  create(
    // @CurrentUser() user : any,
    // @Req() req, // req.user.id,
    @Body() dto: CreateMessageDto,
    @Param('chatRoomId') chatRoomId: string,
    @Param('userId') userId: string,
  ) {
    return this.messagesService.create(dto, userId, chatRoomId);
  }

  @Get(':chatRoomId')
  getChatRoomMessages(
    @Param('chatRoomId') chatRoomId: string,
    @Query() query: any,
  ) {
   
    
    return this.messagesService.getChatRoomMessages(chatRoomId,+query.numberMessages);
  }

  @Get('notSeen/:chatRoomId')
  getNotSeenMessages(
    @Param('chatRoomId') chatRoomId: string,
  ) {
    
    return this.messagesService.getNootSeenMessages(chatRoomId);
  }

  @Patch(':chatRoomId/:messageId')
  update(
    @Param('chatRoomId') chatRoomId: string,
    @Param('messageId') messageId: string,
    @Body() dto: UpdateMessageDto,
  ) {
    return this.messagesService.update(chatRoomId, messageId, dto);
  }

  @Delete(':chatRoomId/:messageId')
  remove(
    @Param('chatRoomId') chatRoomId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messagesService.remove(chatRoomId, messageId);
  }
}