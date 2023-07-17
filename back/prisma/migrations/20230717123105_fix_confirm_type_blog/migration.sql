/*
  Warnings:

  - The `confirm` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "confirm",
ADD COLUMN     "confirm" BOOLEAN NOT NULL DEFAULT false;
