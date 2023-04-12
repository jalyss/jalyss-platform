import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto{

    @ApiProperty({ required: true })
    nameAr: string;
    @ApiProperty({ required: true })
    nameEn: string;
    @ApiProperty({ required: false })
    biographyAr: string;
    @ApiProperty({ required: false })
    biographyEn: string;
}
  
