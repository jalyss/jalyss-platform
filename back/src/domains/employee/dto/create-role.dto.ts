import { ApiProperty } from '@nestjs/swagger';



export class CreateRoleDto {

    @ApiProperty({ required: true })
    roleNameAr: string
    @ApiProperty({ required: true })
    roleNameEn: string
    @ApiProperty({ required: true })
    permissions:Permission[]
}

export type Permission ={
    domain: string;
    action: string;
}