import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentChoiceDto } from './create-paymentChoice.dto';

export class UpdatePaymentChoiceDto extends PartialType(CreatePaymentChoiceDto) {}
