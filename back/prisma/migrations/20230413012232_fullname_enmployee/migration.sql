/*
  Warnings:

  - You are about to drop the column `nameAr` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nameEn` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `fullNameAr` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullNameEn` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "nameAr",
DROP COLUMN "nameEn",
ADD COLUMN     "fullNameAr" TEXT NOT NULL,
ADD COLUMN     "fullNameEn" TEXT NOT NULL;
