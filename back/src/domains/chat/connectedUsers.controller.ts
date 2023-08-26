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
import { ConnectedUsersService } from './connectedUsers.service';
import { CreateConnectedUserDto } from './dto/create-connectedUsers.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('connected users')
@Controller('connectedUser')

export class ConnectedUserController {
    constructor(private readonly connectedUserService:ConnectedUsersService){}

 @Post('')
 create(
    @Body() dto : CreateConnectedUserDto,
 ){
    return this.connectedUserService.create(dto)
 }

@Get('')
getConnectedUser(
){
    return this.connectedUserService.getUsers()
}

@Delete(':userId')
remove(
    @Param('userId') userId:string,
){
    return this.connectedUserService.remove(userId)
}

}