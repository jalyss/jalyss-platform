/*
  Warnings:

  - Added the required column `endAt` to the `SessionHasLecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `SessionHasLecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionHasLecture" ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;
