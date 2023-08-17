/*
  Warnings:

  - You are about to drop the column `content` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `contentAr` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentEn` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "content",
ADD COLUMN     "contentAr" TEXT NOT NULL,
ADD COLUMN     "contentEn" TEXT NOT NULL;
