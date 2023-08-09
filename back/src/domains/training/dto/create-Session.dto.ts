import { ApiProperty } from '@nestjs/swagger';
import { Feature, SessionHasLecture, SessionTarif, SessionTarifHasFeatures } from '@prisma/client';

export class CreateSessionDto {
  @ApiProperty()
  titleEn: string;
  @ApiProperty()
  titleAr: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  previousSessionId: string;
  @ApiProperty()
  nextSessionId: string;
  @ApiProperty()
  SessionHasFeaturesIds: string[];
  @ApiProperty()
  sessionHasGainsIds: string[];
  @ApiProperty()
  sessionHasPrerequiresIds: string[];
  @ApiProperty()
  sessionTypesIds: string[];
  @ApiProperty()
  tarifs: TarifsSesssionDto[];
  @ApiProperty()
  lectures: SessionHasLecture[];
}
export class TarifsSesssionDto {
  titleEn: string;
  titleAr: string;
  price: number;
  features: FeatureTarifSessionDto[];
}
export class FeatureTarifSessionDto {
  isAvailable: boolean;
  id: string;
}