-- DropForeignKey
ALTER TABLE "ReplyCommentBlog" DROP CONSTRAINT "ReplyCommentBlog_commentBlogId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyCommentBlog" DROP CONSTRAINT "ReplyCommentBlog_userId_fkey";

-- AddForeignKey
ALTER TABLE "ReplyCommentBlog" ADD CONSTRAINT "ReplyCommentBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentBlog" ADD CONSTRAINT "ReplyCommentBlog_commentBlogId_fkey" FOREIGN KEY ("commentBlogId") REFERENCES "CommentBlog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
