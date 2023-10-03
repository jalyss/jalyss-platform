import { PartialType } from '@nestjs/swagger';
import { CreateClientPaymentDto } from './create-ClientPayment.dto';

export class UpdateClientPaymentgDto extends PartialType(CreateClientPaymentDto) {}
