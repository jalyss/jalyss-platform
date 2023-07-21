import { PartialType } from "@nestjs/swagger";

import { CreatePrerequireDto } from "./create-prerequire.dto";



export class UpdatePrerequireDto extends PartialType( CreatePrerequireDto) {}