import { Module } from '@nestjs/common';
import { PaymentChoicesService } from './paymentChoice.service';
import { PaymentChoicesController } from './paymentChoice.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentChoicesController],
  providers: [PaymentChoicesService,PrismaService]
})
export class PaymentChoiceModule {}
  
