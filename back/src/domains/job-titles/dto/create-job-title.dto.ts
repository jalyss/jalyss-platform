import { ApiProperty } from "@nestjs/swagger";

export class CreateJobTitleDto {
    @ApiProperty()
    nameAr : string;
    @ApiProperty()
    nameEn: string;
}
