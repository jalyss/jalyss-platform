import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediasService } from './medias/medias.service';
import { PrismaModule } from './prisma/prisma.module';
import { MediasModule } from './medias/medias.module';

@Module({
  imports: [MediasModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, MediasService],
})
export class AppModule {}
