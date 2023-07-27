/*
  Warnings:

  - You are about to drop the column `endAt` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Lecture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "endAt",
DROP COLUMN "startAt";
