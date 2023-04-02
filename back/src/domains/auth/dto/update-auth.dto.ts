//@ts-nocheck
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {

    @ApiProperty()
    confirmPassword: string
    @ApiProperty()
    password: string
}
