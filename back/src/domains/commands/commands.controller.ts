import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { FilterCommand } from './types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('commands')
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post(':branchId')
  create(
    @Body() createCommandDto: CreateCommandDto,
    // @CurrentUser() user:any,
    @Param('branchId') branchId: string,
  ) {
    return this.commandsService.create(createCommandDto, branchId );
  }

  @Get()
  findAll() {
    return this.commandsService.findAll();
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get('/by-user')
  findAllByUserId(@CurrentUser() user: any) {
    return this.commandsService.findAllByUserId(user.id);
  }

  @Get(':branchId')
  findAllByBranchId(
    @Param('branchId') branchId: string,
    @Query() filters: FilterCommand,
  ) {
    return this.commandsService.findAllByBranchIdentifier(branchId, filters);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(id);
  }
  @Get('commandLine/all')
  findAllCommanLIne() {
    return this.commandsService.findAllCommandLIne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {
    return this.commandsService.update(id, updateCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandsService.remove(id);
  }
}
