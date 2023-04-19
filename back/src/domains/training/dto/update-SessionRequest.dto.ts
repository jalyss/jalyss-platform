import { PartialType } from "@nestjs/swagger";
import { CreateSessionRequestDto } from "./create-SessionRequest.dto";

export class UpdateSessionRequestDto extends PartialType(CreateSessionRequestDto) {}


