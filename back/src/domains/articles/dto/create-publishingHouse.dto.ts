import { ApiProperty } from "@nestjs/swagger";

export class CreatePublishingHouseDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  address: string;
  @ApiProperty({ required: true })
  logo: string;


}
