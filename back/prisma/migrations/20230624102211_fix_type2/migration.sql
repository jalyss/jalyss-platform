/*
  Warnings:

  - You are about to drop the column `sessionTypeId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_sessionTypeId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionTypeId";

-- CreateTable
CREATE TABLE "SessionHasSessionType" (
    "sessionId" TEXT NOT NULL,
    "sessionTypeId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionHasSessionType_sessionId_sessionTypeId_key" ON "SessionHasSessionType"("sessionId", "sessionTypeId");

-- AddForeignKey
ALTER TABLE "SessionHasSessionType" ADD CONSTRAINT "SessionHasSessionType_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionHasSessionType" ADD CONSTRAINT "SessionHasSessionType_sessionTypeId_fkey" FOREIGN KEY ("sessionTypeId") REFERENCES "SessionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
