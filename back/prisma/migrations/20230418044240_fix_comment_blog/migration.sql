/*
  Warnings:

  - You are about to drop the `ReplyCommentaireBlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReplyCommentaireBlog" DROP CONSTRAINT "ReplyCommentaireBlog_commentBlogId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyCommentaireBlog" DROP CONSTRAINT "ReplyCommentaireBlog_userId_fkey";

-- DropTable
DROP TABLE "ReplyCommentaireBlog";

-- CreateTable
CREATE TABLE "ReplyCommentBlog" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "commentBlogId" TEXT NOT NULL,

    CONSTRAINT "ReplyCommentBlog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReplyCommentBlog" ADD CONSTRAINT "ReplyCommentBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentBlog" ADD CONSTRAINT "ReplyCommentBlog_commentBlogId_fkey" FOREIGN KEY ("commentBlogId") REFERENCES "CommentBlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
