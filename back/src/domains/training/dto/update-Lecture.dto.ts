import { CreateLectureDto } from "./create-Lecture.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateLectureDto extends PartialType(CreateLectureDto) {}