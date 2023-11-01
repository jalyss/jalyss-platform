import { ApiProperty } from '@nestjs/swagger';


export class CreateFunctionalAreaDto {
    @ApiProperty()
    nameAr : string;
    @ApiProperty()
    nameEn: string;
    @ApiProperty()
    nameFr: string;

}