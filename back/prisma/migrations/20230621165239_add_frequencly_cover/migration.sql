/*
  Warnings:

  - You are about to drop the `_MediaToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MediaToSession" DROP CONSTRAINT "_MediaToSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaToSession" DROP CONSTRAINT "_MediaToSession_B_fkey";

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "endAt" TIMESTAMP(3),
ADD COLUMN     "startAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "coverId" TEXT;

-- DropTable
DROP TABLE "_MediaToSession";

-- CreateTable
CREATE TABLE "MediaSession" (
    "mediaId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SessionFeedback" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sessionId" TEXT,

    CONSTRAINT "SessionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequentilyQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "frequentilyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaSession_mediaId_sessionId_key" ON "MediaSession"("mediaId", "sessionId");

-- AddForeignKey
ALTER TABLE "MediaSession" ADD CONSTRAINT "MediaSession_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaSession" ADD CONSTRAINT "MediaSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionFeedback" ADD CONSTRAINT "SessionFeedback_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
