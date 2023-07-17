import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from './create-provider.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {


    
    
}
