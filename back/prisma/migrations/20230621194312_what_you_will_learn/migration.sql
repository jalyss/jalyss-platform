/*
  Warnings:

  - You are about to drop the `_SessionToWhatYouWillLearn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SessionToWhatYouWillLearn" DROP CONSTRAINT "_SessionToWhatYouWillLearn_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionToWhatYouWillLearn" DROP CONSTRAINT "_SessionToWhatYouWillLearn_B_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "whatYouWillLearnId" TEXT;

-- DropTable
DROP TABLE "_SessionToWhatYouWillLearn";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_whatYouWillLearnId_fkey" FOREIGN KEY ("whatYouWillLearnId") REFERENCES "WhatYouWillLearn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
