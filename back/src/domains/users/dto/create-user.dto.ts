import { ApiProperty } from '@nestjs/swagger';
import { Media, } from '@prisma/client';
export class CreateUserDto {

  @ApiProperty({ required: true })
  fullNameEn!: string;
  @ApiProperty({ required: true })
  fullNameAr! :string
  @ApiProperty({ required: true })
  email!: string;
  @ApiProperty({ required: true })
  address! :string
  @ApiProperty({ required: true })
  tel!:string
  @ApiProperty({ required: true })
  password!:string
  @ApiProperty({ required: false })
  avatarId?:string
  @ApiProperty({ required: false })
  accountBalance?:number
  @ApiProperty({ required: false })
  categoryId?:string
  @ApiProperty({ required: false })
  educationLevelId?:string
  @ApiProperty({ required: false })
  functionalAreaId?:string
  @ApiProperty({ required: false })
  jobTitleId?:string

}
