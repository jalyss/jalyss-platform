/*
  Warnings:

  - You are about to drop the column `descrption` on the `Tarif` table. All the data in the column will be lost.
  - Added the required column `description` to the `Tarif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarif" DROP COLUMN "descrption",
ADD COLUMN     "description" TEXT NOT NULL;
