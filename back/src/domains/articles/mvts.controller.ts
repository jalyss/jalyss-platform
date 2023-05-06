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
import { MvtsService } from './mvts.service';
import { UpdateMvtArticleDto } from './dto/update-mvt.dto';
import { CreateMvtArticleDto } from './dto/create-mvt.dto';

@ApiTags('mvts')
@Controller('mvts')
export class MvtController {
    constructor(private readonly mvtsService: MvtsService) { }
    @Post()
    create(
        @Body() dto: CreateMvtArticleDto,
    ) {
        return this.mvtsService.create(dto);
    }
    @Get()
    findAll() {
        return this.mvtsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mvtsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateMvtArticleDto) {
        return this.mvtsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mvtsService.remove(id);
    }


}