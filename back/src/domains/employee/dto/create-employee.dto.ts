import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({ required: true })
    fullNameAr: string
    @ApiProperty({ required: true })
    fullNameEn: string
    @ApiProperty({ required: true })
    email: string
    @ApiProperty({ required: true })
    address: string
    @ApiProperty({ required: true })
    tel: string
    @ApiProperty({ required: true })
    password: string
    @ApiProperty({ required: true })
    isAdmin: boolean
    @ApiProperty({ required: false })
    branchId: string
    @ApiProperty({ required: false })
    roleId: string
}
