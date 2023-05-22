import { PartialType } from '@nestjs/swagger';
import { CreateUserPaymentDto } from './create-UserPayment.dto';

export class UpdateUserPaymentgDto extends PartialType(CreateUserPaymentDto) {}
