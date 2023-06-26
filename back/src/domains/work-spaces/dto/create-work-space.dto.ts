
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkSpaceDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    capacity?: string;
  
    @ApiProperty()
   description?: string;
  
    @ApiProperty()
    amenities?: string;
  
    @ApiProperty()
    price? : string;
  
    @ApiProperty()
    rating? :string;
  
    @ApiProperty()
    reviews?   :  string;
  
    @ApiProperty()
    imageId? :string;

  
    @ApiProperty()
    serviceId? : string;

}


