import { Controller, Get, Post, Body, Patch, Param, Delete,Query,UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import {ApiTags,ApiSecurity} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';
import { FormatLogin } from '../users/users.service';

@ApiTags('bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateBookmarkDto: CreateBookmarkDto,@CurrentUser() user:FormatLogin) {
    return this.bookmarkService.create(CreateBookmarkDto,user.id);
  }

  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }
  

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
  }
  
  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get('by-user')
  findAllByUser(@CurrentUser()user:any){
    return this.bookmarkService.findAllByUser(user.id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(id, UpdateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(id);
  }
}
