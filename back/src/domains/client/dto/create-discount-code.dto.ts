import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountCodeDto {
    
    
    @ApiProperty({ required: true })
    code: string
    @ApiProperty({ required: true })
    clientId: string
    @ApiProperty({ required: true })
    discount: number
   
  
}

