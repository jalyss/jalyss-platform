/*
  Warnings:

  - Added the required column `LikeCategoryId` to the `BlogLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogLike" ADD COLUMN     "LikeCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LikeCategory" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "LikeCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogLike" ADD CONSTRAINT "BlogLike_LikeCategoryId_fkey" FOREIGN KEY ("LikeCategoryId") REFERENCES "LikeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
