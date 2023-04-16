/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[blogId,userId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_blogId_userId_key" ON "Bookmark"("blogId", "userId");
