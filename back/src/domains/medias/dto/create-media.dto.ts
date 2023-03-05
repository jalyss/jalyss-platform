import { ApiProperty } from "@nestjs/swagger";
export class CreateMediaDto {
    @ApiProperty({required:false})
    path:string
    @ApiProperty({required:false})
    type:string
    @ApiProperty({required:false})
    alt:string
    @ApiProperty({required:false})
    extension:string
    @ApiProperty({required:false})
    description:string
}
