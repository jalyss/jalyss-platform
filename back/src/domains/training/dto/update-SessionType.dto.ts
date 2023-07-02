import { PartialType } from "@nestjs/swagger";
import { CreateSessionTypefDto } from "./create-SessionType.dto";


export class UpdateSessionTypeDto extends PartialType(CreateSessionTypefDto) {}