import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { SearchEngineService } from './search-engine.service';
import { SearchEngineController } from './search-engine.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [SearchEngineController],
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 500,
      store: 'memory',
      isGlobal: true,
    }),
  ],
  providers: [
    SearchEngineService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class SearchEngineModule {}
