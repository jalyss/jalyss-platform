/*
  Warnings:

  - Made the column `duration` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Tarif` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tarif" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "capacity" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
