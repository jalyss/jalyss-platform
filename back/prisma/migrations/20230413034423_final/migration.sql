/*
  Warnings:

  - You are about to drop the column `workSpaceId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `WorkSpace` table. All the data in the column will be lost.
  - You are about to drop the `JoinTarifWorkSpace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descrption` to the `Tarif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Tarif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tarif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('confirmed', 'pending', 'refused');

-- DropForeignKey
ALTER TABLE "JoinTarifWorkSpace" DROP CONSTRAINT "JoinTarifWorkSpace_tarifId_fkey";

-- DropForeignKey
ALTER TABLE "JoinTarifWorkSpace" DROP CONSTRAINT "JoinTarifWorkSpace_workSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_workSpaceId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "workSpaceId";

-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descrption" TEXT NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkSpace" DROP COLUMN "type",
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "JoinTarifWorkSpace";

-- AddForeignKey
ALTER TABLE "WorkSpace" ADD CONSTRAINT "WorkSpace_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarif" ADD CONSTRAINT "Tarif_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
