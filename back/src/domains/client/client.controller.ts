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
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FilterClient } from './types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filters: FilterClient) {
    return this.clientsService.findAll(filters);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
