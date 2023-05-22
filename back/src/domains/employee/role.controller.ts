import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class roleController {
    constructor(private readonly roleService: RoleService) { }


    @Get('all')
    findAll() {
        return this.roleService.findAll();
    }

    @Get('/one:id')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(id);
    }


    @Post('create')
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateRoleDto: UpdateRoleDto) {
        return this.roleService.update(id, UpdateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(id);
    }
}