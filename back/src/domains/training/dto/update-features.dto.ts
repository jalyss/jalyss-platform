import { PartialType } from "@nestjs/swagger";

import { CreateFeaturesDto } from "./create-features.dto";

export class UpdateFeaturesDto extends PartialType( CreateFeaturesDto) {}