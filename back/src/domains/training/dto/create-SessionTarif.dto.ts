import { ApiProperty } from '@nestjs/swagger';
export class FeatureWithAvailability {
    @ApiProperty()
    featureId: string;
    
    @ApiProperty()
    isAvailable: boolean;
  }
export class CreateSessionTarifDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: [FeatureWithAvailability], required: false })
  features?: FeatureWithAvailability[] = []; ;
}


