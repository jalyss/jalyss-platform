
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkSpaceDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    firstLine: string;
  
    @ApiProperty()
    secondLine: string;
  
    @ApiProperty()
    thirdLine: string;
  
    @ApiProperty()
    image: string;
  
    @ApiProperty()
    pricingLine1: string;
  
    @ApiProperty()
    pricingLine2: string;
  
    @ApiProperty()
    pricingLine3: string;
  
    @ApiProperty()
    pricingLine4: string;
  
    @ApiProperty()
    autresLine1: string;
  
    @ApiProperty()
    autresLine2: string;
  
    @ApiProperty()
    autresLine3: string;
  
    @ApiProperty()
    autresLine4: string;
  
    @ApiProperty()
    serviceId: string;
}


