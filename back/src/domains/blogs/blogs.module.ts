import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarksController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { CommentsBlogController } from './comment-blog.controlller';
import { CommentBlogService } from './comment-blog.service';
import { RepliesController } from './reply-comment.controller';
import { RepliesService } from './reply-comment.service';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { LikeCategoryController } from './like-category.controller';
import { LikeCategoryService } from './like-category.service';


@Module({
  controllers: [BlogsController,BookmarksController,CommentsBlogController,RepliesController,ViewsController,LikeCategoryController],
  providers: [BlogsService,PrismaService,BookmarkService,CommentBlogService,RepliesService,ViewsService,LikeCategoryService]
})
export class BlogsModule {}
