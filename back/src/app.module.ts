import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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


@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, CommandsModule, BranchesModule,UsersModule,MediasModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,MediasService],
})
export class AppModule {}
