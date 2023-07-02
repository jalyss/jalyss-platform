import { PartialType } from "@nestjs/swagger";
import { CreateSessionTarifDto } from "./create-SessionTarif.dto";

export class UpdateSessionTarifDto extends PartialType(CreateSessionTarifDto)  {
    
}