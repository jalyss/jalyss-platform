import { ApiProperty } from "@nestjs/swagger";

export class CreateFeaturesDto {
 @ApiProperty()
 labelEn:string;
 @ApiProperty()
 labelAr:string;

//  @ApiProperty()
//  SessionTarifHasFeaturesIds: string[];



}