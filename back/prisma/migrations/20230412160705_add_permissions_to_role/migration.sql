/*
  Warnings:

  - Added the required column `permissions` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissions" JSONB NOT NULL;
