/*
  Warnings:

  - Added the required column `nameFr` to the `EducationLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `FunctionalArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `JobTitle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EducationLevel" ADD COLUMN     "nameFr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FunctionalArea" ADD COLUMN     "nameFr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobTitle" ADD COLUMN     "nameFr" TEXT NOT NULL;
