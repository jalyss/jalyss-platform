import { PartialType } from "@nestjs/swagger";
import { CreateSessionDto } from "./create-Session.dto";


export class UpdateSessionDto extends PartialType(CreateSessionDto) {}