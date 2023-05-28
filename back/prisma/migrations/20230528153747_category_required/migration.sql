/*
  Warnings:

  - Made the column `categoryId` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "categoryId" SET NOT NULL;
