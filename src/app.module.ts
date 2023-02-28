import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { CommandsModule } from './commands/commands.module';

import { PrismaService } from './prisma/prisma.service';
import { BranchesModule } from './branches/branches.module';

@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, CommandsModule, BranchesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
