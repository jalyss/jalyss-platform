import { Module } from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { WorkSpacesController } from './work-spaces.controller';

@Module({
  controllers: [WorkSpacesController],
  providers: [WorkSpacesService],

})
export class WorkSpacesModule {}
