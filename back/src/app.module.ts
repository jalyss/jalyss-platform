import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './domains/auth/auth.module';
import { ArticleModule } from './domains/articles/articles.module';
import { CommandsModule } from './domains/commands/commands.module';
import { BranchesModule } from './domains/branches/branches.module';
import { UsersModule } from './domains/users/users.module';
import { MediasModule } from './domains/medias/medias.module';
import { MediasService } from './domains/medias/medias.service';
import { countriesModule } from './domains/country/countries.module';
import { CitesModule } from './domains/cites/cities.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ClientsModule } from './domains/client/client.module';
import { MailModule } from './domains/mail/mail.module';
import { EmployeeModule } from './domains/employee/employee.module';
import { BlogsModule } from './domains/blogs/blogs.module';
import { ChatModule } from './domains/chat/chat.module';
import { WorkSpacesModule } from './domains/work-spaces/work-spaces.module';
import { LikesModule } from './likes/likes.module';
import { TrainingModule } from './domains/training/training.module';
import { QuestionsModule } from './domains/questions/questions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { FrontendMiddleware } from './middlewere/front.middlewere';

import { ProvidersModule } from './domains/providers/providers.module';
import { FunctionalAreasModule } from './domains/functional-areas/functional-areas.module';
import { JobTitlesModule } from './domains/job-titles/job-titles.module';
import { EducationLevelsModule } from './domains/education-levels/education-levels.module';
// import { SearchController } from './search/search.controller';
import { SearchEngineModule } from './search-engine/search-engine.module';

@Module({
  imports: [
    MailModule,
    AuthModule,
    PrismaModule,
    ArticleModule,
    CommandsModule,
    BranchesModule,
    UsersModule,
    MediasModule,
    countriesModule,
    CitesModule,
    EmployeeModule,
    BlogsModule,
    ChatModule,
    WorkSpacesModule,
    BlogsModule,
    LikesModule,
    TrainingModule,
    QuestionsModule,
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        maxAge: 604800, // one week
        cacheControl: false,
        etag: false,
      },
      rootPath: join(__dirname, '../../../back-office', 'build'),
      // serveRoot: '/back-office',
      // renderPath: '/back-office',
    }),
    
   
    ProvidersModule,

    FunctionalAreasModule,

    JobTitlesModule,

    EducationLevelsModule,

    SearchEngineModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MediasService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(FrontendMiddleware).forRoutes('*');
  }

}
