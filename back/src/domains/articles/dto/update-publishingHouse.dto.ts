import { PartialType } from '@nestjs/mapped-types';
import { CreatePublishingHouseDto } from './create-publishingHouse.dto';

export class UpdatePublishingHouseDto extends PartialType(CreatePublishingHouseDto) {}
