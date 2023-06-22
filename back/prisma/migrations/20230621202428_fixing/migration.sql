/*
  Warnings:

  - You are about to drop the column `whatYouWillLearnId` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `whatYouWillLearnId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `_PrerequireToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_whatYouWillLearnId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_whatYouWillLearnId_fkey";

-- DropForeignKey
ALTER TABLE "_PrerequireToSession" DROP CONSTRAINT "_PrerequireToSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_PrerequireToSession" DROP CONSTRAINT "_PrerequireToSession_B_fkey";

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "whatYouWillLearnId";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "whatYouWillLearnId";

-- DropTable
DROP TABLE "_PrerequireToSession";

-- CreateTable
CREATE TABLE "SessionHasWhatYouWillLearn" (
    "sessionId" TEXT NOT NULL,
    "WhatYouWillLearnId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LectureHasWhatYouWillLearn" (
    "lectureId" TEXT NOT NULL,
    "WhatYouWillLearnId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sessionHasPrerequire" (
    "sessionId" TEXT NOT NULL,
    "prerequireId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionHasWhatYouWillLearn_sessionId_WhatYouWillLearnId_key" ON "SessionHasWhatYouWillLearn"("sessionId", "WhatYouWillLearnId");

-- CreateIndex
CREATE UNIQUE INDEX "LectureHasWhatYouWillLearn_lectureId_WhatYouWillLearnId_key" ON "LectureHasWhatYouWillLearn"("lectureId", "WhatYouWillLearnId");

-- CreateIndex
CREATE UNIQUE INDEX "sessionHasPrerequire_sessionId_prerequireId_key" ON "sessionHasPrerequire"("sessionId", "prerequireId");

-- AddForeignKey
ALTER TABLE "SessionHasWhatYouWillLearn" ADD CONSTRAINT "SessionHasWhatYouWillLearn_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionHasWhatYouWillLearn" ADD CONSTRAINT "SessionHasWhatYouWillLearn_WhatYouWillLearnId_fkey" FOREIGN KEY ("WhatYouWillLearnId") REFERENCES "WhatYouWillLearn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureHasWhatYouWillLearn" ADD CONSTRAINT "LectureHasWhatYouWillLearn_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureHasWhatYouWillLearn" ADD CONSTRAINT "LectureHasWhatYouWillLearn_WhatYouWillLearnId_fkey" FOREIGN KEY ("WhatYouWillLearnId") REFERENCES "WhatYouWillLearn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionHasPrerequire" ADD CONSTRAINT "sessionHasPrerequire_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionHasPrerequire" ADD CONSTRAINT "sessionHasPrerequire_prerequireId_fkey" FOREIGN KEY ("prerequireId") REFERENCES "Prerequire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
