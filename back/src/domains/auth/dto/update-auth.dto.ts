//@ts-nocheck
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { Client, FunctionalArea } from '@prisma/client';

export class ChangePasswordDto  {
    @ApiProperty()
    email:string
    @ApiProperty()
    confirmPassword: string
    @ApiProperty()
    password: string
}

export class UpdateAuthDto {
fullNameEn:string
fullNameAr:string
email:string
avatarId:string
client:any
}
