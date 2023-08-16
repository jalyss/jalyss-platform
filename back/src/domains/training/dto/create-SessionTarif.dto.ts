import { ApiProperty } from '@nestjs/swagger';
export class FeatureWithAvailability {
    @ApiProperty()
    featureId: string;
    
    @ApiProperty()
    isAvailable: boolean;
  }
export class CreateSessionTarifDto {
  @ApiProperty()
  titleEn: string;
  @ApiProperty()
  titleAr: string;

  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: [FeatureWithAvailability], required: false })
  features?: FeatureWithAvailability[] = []; ;
}


