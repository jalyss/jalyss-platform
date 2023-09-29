import {
  UseInterceptors,
  Controller,
  Get,
  Param,
  Logger,
} from '@nestjs/common';

import { SearchEngineService } from './search-engine.service';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
// @UseInterceptors(CacheInterceptor)
// interface StringArray {
//   // Use an index signature to specify that the array will have numeric indices
//   [index: number]: string;
// }
export class SearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}
  private logger = new Logger(SearchEngineController.name);
  @Get(':query')
  findAll(@Param('query') query: string) {
    var q = decodeURIComponent(query);
    this.logger.log('sdefrfgthyjuki', q);
    // return q;
    return this.searchEngineService.findAll(q);
  }
}
