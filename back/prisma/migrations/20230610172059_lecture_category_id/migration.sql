/*
  Warnings:

  - You are about to drop the column `lectureId` on the `ArticleCategory` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_lectureId_fkey";

-- AlterTable
ALTER TABLE "ArticleCategory" DROP COLUMN "lectureId";

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
