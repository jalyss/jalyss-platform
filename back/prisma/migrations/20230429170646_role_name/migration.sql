/*
  Warnings:

  - You are about to drop the column `roleNameAr` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `roleNameEn` on the `Role` table. All the data in the column will be lost.
  - Added the required column `nameAr` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "roleNameAr",
DROP COLUMN "roleNameEn",
ADD COLUMN     "nameAr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;
