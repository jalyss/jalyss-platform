import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() CreateBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(CreateBookmarkDto);
  }

  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
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
