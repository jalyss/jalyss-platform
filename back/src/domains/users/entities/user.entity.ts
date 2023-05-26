import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class User {}
export class UserLogin{

    @ApiProperty()
    @IsNotEmpty() readonly email:string;
    
    @ApiProperty()
    @IsNotEmpty() readonly password:string;
}
export class UpdatePasswordDto {

    @IsNotEmpty()
    @ApiProperty() new_password: string;

    @IsNotEmpty()
    @ApiProperty() old_password: string;

}

