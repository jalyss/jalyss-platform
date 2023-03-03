/*
  Warnings:

  - You are about to drop the column `name` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `clientAddress` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `clientTel` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `hasDelivery` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `intermediateId` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Command` table. All the data in the column will be lost.
  - Added the required column `branch_id` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_address` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_name` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_tel` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_intermediateId_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "name",
ADD COLUMN     "long_desc" TEXT,
ADD COLUMN     "short_desc" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Command" DROP COLUMN "branchId",
DROP COLUMN "clientAddress",
DROP COLUMN "clientId",
DROP COLUMN "clientName",
DROP COLUMN "clientTel",
DROP COLUMN "hasDelivery",
DROP COLUMN "intermediateId",
DROP COLUMN "userId",
ADD COLUMN     "branch_id" TEXT NOT NULL,
ADD COLUMN     "client_address" TEXT NOT NULL,
ADD COLUMN     "client_id" TEXT,
ADD COLUMN     "client_name" TEXT NOT NULL,
ADD COLUMN     "client_tel" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "has_delivery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "intermediate_id" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "delivered" SET DEFAULT false,
ALTER COLUMN "paid" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_intermediate_id_fkey" FOREIGN KEY ("intermediate_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
