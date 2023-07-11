import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
    
    
    @ApiProperty({ required: true })
    name: string
    @ApiProperty({ required: true })
    address: string
    @ApiProperty({ required: true })
    tel: string
    @ApiProperty({ required: true })
    accountBalance: number
    @ApiProperty({ required: true })
    logo: string
    @ApiProperty({ required: true })
    email: string
  
}
