import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

import { AuthModule } from './domains/auth/auth.module';
import { ArticleModule } from './domains/articles/articles.module';
import { CommandsModule } from './domains/commands/commands.module';
import { BranchesModule } from './domains/branches/branches.module';


@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, CommandsModule, BranchesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
