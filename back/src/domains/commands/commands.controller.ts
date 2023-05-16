import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { FilterCommand } from './types';

@ApiTags('commands')
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post(':branchId')
  create(
    @Body() createCommandDto: CreateCommandDto,
    @Param('branchId') branchId: string,
  ) {
    return this.commandsService.create(createCommandDto, branchId);
  }

  @Get()
  findAll() {
    return this.commandsService.findAll();
  }
  @Get(':branchId')
  findAllByBranchId(@Param('branchId') branchId: string,
  @Query() filters:FilterCommand) {
    return this.commandsService.findAllByBranchIdentifier(branchId,filters);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(id);
  }
@Get('commandLine/all')
findAllCommanLIne(){
  return this.commandsService.findAllCommandLIne();
}

  @Patch(':id')
  update(@Param('id') id: string, 
  @Body() updateCommandDto: UpdateCommandDto
  ) {
    return this.commandsService.update(id, updateCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandsService.remove(id);
  }
}
