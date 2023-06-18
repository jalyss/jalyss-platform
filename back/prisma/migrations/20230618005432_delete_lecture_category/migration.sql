/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Lecture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_categoryId_fkey";

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "categoryId";
