import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        maxAge: 604800, // one week
        cacheControl: false,
        etag: false,
      },
      rootPath: join(__dirname, '../../../front', 'build'),
      // serveRoot: '/back-office',
      // renderPath: '/back-office',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    //   consumer.apply(FrontendMiddleware).forRoutes('*');
  }
}
