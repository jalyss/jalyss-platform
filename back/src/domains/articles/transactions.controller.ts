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


import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }
    @Post()
    create(
        @Body() dto: CreateTransactionDto,
    ) {
        return this.transactionService.create(dto);
    }
    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(id);
    }

    @Get('branchSenderId/:branchSenderId')
    findTransictionsByBarnchId(@Param('branchSenderId') id: string) {
        return this.transactionService.findTransictionsByBarnchId(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
        return this.transactionService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionService.remove(id);
    }


}