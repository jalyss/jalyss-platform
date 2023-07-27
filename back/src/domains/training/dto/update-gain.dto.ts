import { PartialType } from "@nestjs/swagger";
import { CreateGainDto } from "./create-gain.dto";



export class UpdateGainDto extends PartialType( CreateGainDto) {}