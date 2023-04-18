-- DropForeignKey
ALTER TABLE "CommentBlog" DROP CONSTRAINT "CommentBlog_blogId_fkey";

-- DropForeignKey
ALTER TABLE "CommentBlog" DROP CONSTRAINT "CommentBlog_userId_fkey";

-- AddForeignKey
ALTER TABLE "CommentBlog" ADD CONSTRAINT "CommentBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentBlog" ADD CONSTRAINT "CommentBlog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
