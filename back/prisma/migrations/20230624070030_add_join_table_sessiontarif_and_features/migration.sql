/*
  Warnings:

  - You are about to drop the `_FeatureToSessionTarif` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FeatureToSessionTarif" DROP CONSTRAINT "_FeatureToSessionTarif_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeatureToSessionTarif" DROP CONSTRAINT "_FeatureToSessionTarif_B_fkey";

-- DropTable
DROP TABLE "_FeatureToSessionTarif";

-- CreateTable
CREATE TABLE "SessionTarifHasFeatures" (
    "featureId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionTarifHasFeatures_featureId_sessionId_key" ON "SessionTarifHasFeatures"("featureId", "sessionId");

-- AddForeignKey
ALTER TABLE "SessionTarifHasFeatures" ADD CONSTRAINT "SessionTarifHasFeatures_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTarifHasFeatures" ADD CONSTRAINT "SessionTarifHasFeatures_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionTarif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
