import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @ApiProperty({ required: true })
    fullNameEn!: string;
    @ApiProperty({ required: true })
    fullNameAr!: string
    @ApiProperty({ required: true })
    email!: string;
    @ApiProperty({ required: true })
    address!: string
    @ApiProperty({ required: true })
    tel!: string
    @ApiProperty({ required: false })
    avatarId?: string
    @ApiProperty({ required: false })
    accountBalance?: number
    @ApiProperty({ required: false })
    categoryId?: string
    @ApiProperty({ required: false })
    educationLevelId?: string
    @ApiProperty({ required: false })
    functionalAreaId?: string
    @ApiProperty({ required: false })
    jobTitleId?: string
}
export class UpdateUserStatusDto {
    @ApiProperty({required:true})
    isActive!: boolean
}
