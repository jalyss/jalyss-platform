import { PartialType } from "@nestjs/swagger";
import { CreateTrainingBookingDto } from "./create-TrainingBooking.dto";

export class UpdateTrainingBookingDto extends PartialType(CreateTrainingBookingDto) {}

