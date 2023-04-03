import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({ required: false })
    nameAr: string
    @ApiProperty({ required: false })
    nameEn: string
    @ApiProperty({ required: false })
    email: string
    @ApiProperty({ required: false })
    address: string
    @ApiProperty({ required: false })
    tel: number
    @ApiProperty({ required: false })
    isAdmin: boolean
    @ApiProperty({ required: false })
    branchId: string
    @ApiProperty({ required: false })
    roleId:string
}
