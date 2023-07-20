import { ApiProperty } from "@nestjs/swagger";
import { StatusBlog } from "@prisma/client";

export class CreateSessionRequestDto {
 
     @ApiProperty()
     resumeId : string
     @ApiProperty()
     requestCategoriesIds:string[]

}
export class UpdateReqDto {
     status: StatusBlog;
    
   }