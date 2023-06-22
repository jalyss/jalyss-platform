-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "whatYouWillLearnId" TEXT;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_whatYouWillLearnId_fkey" FOREIGN KEY ("whatYouWillLearnId") REFERENCES "WhatYouWillLearn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
