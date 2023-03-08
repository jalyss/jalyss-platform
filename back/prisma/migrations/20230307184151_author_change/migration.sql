/*
  Warnings:

  - You are about to drop the column `biography` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Author` table. All the data in the column will be lost.
  - Added the required column `nameAr` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "biography",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "biographyAr" TEXT,
ADD COLUMN     "biographyEn" TEXT,
ADD COLUMN     "nameAr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;
