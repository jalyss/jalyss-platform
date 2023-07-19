/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Feature` table. All the data in the column will be lost.
  - Added the required column `isAvailable` to the `SessionTarifHasFeatures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "isAvailable";

-- AlterTable
ALTER TABLE "SessionTarifHasFeatures" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "SessionHasFeatures" (
    "featureId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionHasFeatures_featureId_sessionId_key" ON "SessionHasFeatures"("featureId", "sessionId");

-- AddForeignKey
ALTER TABLE "SessionHasFeatures" ADD CONSTRAINT "SessionHasFeatures_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionHasFeatures" ADD CONSTRAINT "SessionHasFeatures_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
