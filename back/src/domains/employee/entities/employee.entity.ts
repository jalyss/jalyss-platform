import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class Employee {}
export class EmployeeLogin{

    @ApiProperty()
    @IsNotEmpty() readonly email:string;
    @ApiProperty()
    @IsNotEmpty() readonly password:string;
}