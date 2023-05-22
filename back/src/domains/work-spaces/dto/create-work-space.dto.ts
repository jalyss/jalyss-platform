
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkSpaceDto {
    name: string;

    @ApiProperty()
    image: string;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    capacity: number;
  
    @ApiProperty()
    amenities: string;
  
    @ApiProperty()
    price: number;
  
    @ApiProperty()
    rating: number;
  
    @ApiProperty()
    reviews: number;
  
    @ApiProperty()
    serviceId: string;
}


