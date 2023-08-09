import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
@ApiTags('clients')
@Controller('clients')
export class clientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post('create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get('clients')
  findAll( ) {
    return this.clientsService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
