/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tarifId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tarifId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_workspaceId_fkey";

-- DropIndex
DROP INDEX "Booking_userId_workspaceId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "workspaceId",
ADD COLUMN     "tarifId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workSpaceId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarif" (
    "id" TEXT NOT NULL,
    "duration" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tarif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinTarifWorkSpace" (
    "id" TEXT NOT NULL,
    "tarifId" TEXT NOT NULL,
    "workSpaceId" TEXT NOT NULL,

    CONSTRAINT "JoinTarifWorkSpace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JoinTarifWorkSpace_workSpaceId_tarifId_key" ON "JoinTarifWorkSpace"("workSpaceId", "tarifId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_tarifId_key" ON "Booking"("userId", "tarifId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_workSpaceId_fkey" FOREIGN KEY ("workSpaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tarifId_fkey" FOREIGN KEY ("tarifId") REFERENCES "Tarif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTarifWorkSpace" ADD CONSTRAINT "JoinTarifWorkSpace_tarifId_fkey" FOREIGN KEY ("tarifId") REFERENCES "Tarif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTarifWorkSpace" ADD CONSTRAINT "JoinTarifWorkSpace_workSpaceId_fkey" FOREIGN KEY ("workSpaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
