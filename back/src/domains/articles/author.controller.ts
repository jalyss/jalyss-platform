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
import { authorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class authorController {
    constructor(private readonly authorService: authorService) { }
    @Post()
    create(
        @Body() dto: CreateAuthorDto,
    ) {
        return this.authorService.create(dto);
    }
    @Get()
    findAll() {
        return this.authorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
        return this.authorService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authorService.remove(id);
    }


}