/*
  Warnings:

  - The primary key for the `MediaBlog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MediaBlog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MediaBlog" DROP CONSTRAINT "MediaBlog_blogId_fkey";

-- AlterTable
ALTER TABLE "MediaBlog" DROP CONSTRAINT "MediaBlog_pkey",
DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "MediaBlog" ADD CONSTRAINT "MediaBlog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
