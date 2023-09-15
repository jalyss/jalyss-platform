import { ApiProperty } from '@nestjs/swagger';

export class  CreateBookingDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  freeSpace: string;

 
  @ApiProperty()
  date: Date;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  tarifId: string;
}
