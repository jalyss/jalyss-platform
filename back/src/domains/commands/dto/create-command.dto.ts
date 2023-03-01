import { ApiProperty } from "@nestjs/swagger";

export class CreateCommandDto {

    @ApiProperty({required:false})
    clientId:string
    @ApiProperty({required:false})
    intermediateId?:string
    @ApiProperty({required:true})
    clientName:string
    @ApiProperty({required:true})
    clientAddress:string
    @ApiProperty({required:true})
    clientTel:string
    @ApiProperty({required:true})
    delivered:boolean
    @ApiProperty({required:true})
    paid:boolean
    @ApiProperty({required:true})
    hasDelivery:boolean
    @ApiProperty({required:true})
    commandLine:any[]
  

}
