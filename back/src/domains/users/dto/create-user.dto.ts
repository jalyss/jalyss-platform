import { ApiProperty } from '@nestjs/swagger';
import { Media } from '@prisma/client';
export class CreateUserDto {
  @ApiProperty({ required: true })
  fullNameEn!: string;
  @ApiProperty({ required: true })
  fullNameAr!: string;
  @ApiProperty({ required: false })
  isClient: boolean;
  @ApiProperty({ required: false })
  employeeId?: string;
  @ApiProperty({ required: false })
  clientId?: string;
  @ApiProperty({ required: true })
  email!: string;
  @ApiProperty({ required: true })
  password!: string;
  @ApiProperty({ required: false })
  avatarId?: string;
  @ApiProperty()
  tel: string;
  @ApiProperty()
  address: string;
}
