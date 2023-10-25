/*
  Warnings:

  - Added the required column `unitPrice` to the `CommandLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Command" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CommandLine" ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;
