import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        maxAge: 604800, // one week
        cacheControl: false,
        etag: false,
      },
      rootPath: join(__dirname, '../../front', 'build'),
      // serveRoot: '/back-office',
      // renderPath: '/back-office',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
