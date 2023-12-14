//@ts-nocheck
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { Client, FunctionalArea } from '@prisma/client';

export class ChangePasswordDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  confirmPassword: string;
  @ApiProperty()
  password: string;
}

export class UpdateAuthDto {
  @ApiProperty({ required: true })
  fullNameEn!: string;
  @ApiProperty({ required: true })
  fullNameAr!: string;
  @ApiProperty({ required: true })
  email!: string;
  @ApiProperty({ required: true })
  address!: string;
  @ApiProperty({ required: true })
  tel!: string;
  @ApiProperty({ required: false })
  avatarId?: string;
  @ApiProperty({ required: false })
  accountBalance?: number;
  @ApiProperty({ required: false })
  categoryId?: string;
  @ApiProperty({ required: false })
  educationLevelId?: string;
  @ApiProperty({ required: false })
  functionalAreaId?: string;
  @ApiProperty({ required: false })
  jobTitleId?: string;
  @ApiProperty({ required: false })
  cityId?: string;
  @ApiProperty({ required: false })
  countryId?: string;
  @ApiProperty({ required: false })
  clientId?: string;
  @ApiProperty({ required: false })
  employeeId?: string;
  @ApiProperty({ required: false })
  isAdmin?: Boolean;
  @ApiProperty({ required: false })
  branchId?: string;
  @ApiProperty({ required: false })
  roleId?: string;
  @ApiProperty({ required: false })
  isClient: boolean;
  @ApiProperty({ required: false })
  proposalCountry: string;
  @ApiProperty({ required: false })
  proposalCity: string;
  @ApiProperty({ required: false })
  proposalFunctionalArea: string;
  @ApiProperty({ required: false })
  proposalJobTitle: string;
  @ApiProperty({ required: false })
  proposalEducationLevel: string;
}
