import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserChatroomService } from './user-chatroom.service';
import { CreateUserChatroomDto } from './dto/create-user-chatroom.dto';
import { UpdateUserChatroomDto } from './dto/update-user-chatroom.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';



@ApiTags('user-chatroom')
@Controller('user-chatroom')
export class UserChatroomController {
  constructor(private readonly userChatroomService: UserChatroomService) {}

  @Post()
  create(@Body() createUserChatroomDto: CreateUserChatroomDto) {
    return this.userChatroomService.create(createUserChatroomDto);
  }

  @Delete()
  remove(@Body() updateUserChatroomDto: UpdateUserChatroomDto) {
    return this.userChatroomService.remove(updateUserChatroomDto);
  }
}