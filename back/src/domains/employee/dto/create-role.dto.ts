import { ApiProperty } from '@nestjs/swagger';



export class CreateRoleDto {

    @ApiProperty({ required: true })
    nameAr: string
    @ApiProperty({ required: true })
    nameEn: string
    @ApiProperty({ required: true })
    permissions:Permission[]
}

export type Permission ={
    domain: string  //article;
    action: string  // create;
}