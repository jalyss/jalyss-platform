/*
  Warnings:

  - You are about to drop the column `LikeCategoryId` on the `BlogLike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,blogId,likeCategoryId]` on the table `BlogLike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `likeCategoryId` to the `BlogLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogLike" DROP CONSTRAINT "BlogLike_LikeCategoryId_fkey";

-- DropIndex
DROP INDEX "BlogLike_userId_blogId_key";

-- AlterTable
ALTER TABLE "BlogLike" DROP COLUMN "LikeCategoryId",
ADD COLUMN     "likeCategoryId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BlogLike_userId_blogId_likeCategoryId_key" ON "BlogLike"("userId", "blogId", "likeCategoryId");

-- AddForeignKey
ALTER TABLE "BlogLike" ADD CONSTRAINT "BlogLike_likeCategoryId_fkey" FOREIGN KEY ("likeCategoryId") REFERENCES "LikeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
