import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogsCategoryController } from './blog-category.controller';
import { BlogsCategoryService } from './blog-category.service';
import { BookmarksController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { CommentsBlogController } from './comment-blog.controlller';
import { CommentBlogService } from './comment-blog.service';
import { RepliesController } from './reply-comment.controller';
import { RepliesService } from './reply-comment.service';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { MediaBlogController } from './media-blog.controller';
import { MediaBlogService } from './media-blog.service';
import { BlogLikesController } from './blog-like.controller';
import { BlogLikesService } from './blog-like.service';
import { LikeCategoryController } from './like-category.controller';
import { LikeCategoryService } from './like-category.service';


@Module({
  controllers: [BlogsController,BlogsCategoryController,BookmarksController,CommentsBlogController,RepliesController,ViewsController,MediaBlogController,BlogLikesController,LikeCategoryController],
  providers: [BlogsService,PrismaService,BlogsCategoryService,BookmarkService,CommentBlogService,RepliesService,ViewsService,MediaBlogService,BlogLikesService,LikeCategoryService]
})
export class BlogsModule {}
