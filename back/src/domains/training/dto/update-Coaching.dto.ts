import { PartialType } from "@nestjs/swagger";
import { CreateCoachingDto } from "./create-Coaching.dto";

export class UpdateCoachingDto extends PartialType(CreateCoachingDto) {}