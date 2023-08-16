import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
    @ApiProperty({ required: true })
    fullNameEn: string;
    @ApiProperty({ required: true })
    fullNameAr: string;
    @ApiProperty({ required: true })
    email: string;
    @ApiProperty({ required: true })
    address: string;
    @ApiProperty({ required: true })
    tel: string;
    @ApiProperty({ required: true })
    accountBalance: number;
    @ApiProperty({ required: false })
    isCoach: boolean;
    @ApiProperty({ required: false })
    avatarId: string;
    @ApiProperty({ required: false })
    categoryId: string;
    @ApiProperty({ required: false })
    educationLevelId: string;
    @ApiProperty({ required: false })
    functionalAreaId: string;
    @ApiProperty({ required: false })
    jobTitleId: string;
    @ApiProperty({ required: false })
    countryId: string;
    @ApiProperty({ required: false })
    cityId: string;
}
