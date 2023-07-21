/*
  Warnings:

  - You are about to drop the column `sessionId` on the `SessionTarifHasFeatures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[featureId,tarifId]` on the table `SessionTarifHasFeatures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tarifId` to the `SessionTarifHasFeatures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SessionTarifHasFeatures" DROP CONSTRAINT "SessionTarifHasFeatures_sessionId_fkey";

-- DropIndex
DROP INDEX "SessionTarifHasFeatures_featureId_sessionId_key";

-- AlterTable
ALTER TABLE "SessionTarifHasFeatures" DROP COLUMN "sessionId",
ADD COLUMN     "tarifId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SessionTarifHasFeatures_featureId_tarifId_key" ON "SessionTarifHasFeatures"("featureId", "tarifId");

-- AddForeignKey
ALTER TABLE "SessionTarifHasFeatures" ADD CONSTRAINT "SessionTarifHasFeatures_tarifId_fkey" FOREIGN KEY ("tarifId") REFERENCES "SessionTarif"("id") ON DELETE CASCADE ON UPDATE CASCADE;
