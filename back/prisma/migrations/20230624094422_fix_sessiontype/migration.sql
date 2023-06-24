/*
  Warnings:

  - You are about to drop the `SessionHasSessionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionHasSessionType" DROP CONSTRAINT "SessionHasSessionType_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionHasSessionType" DROP CONSTRAINT "SessionHasSessionType_sessionTypeId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "sessionTypeId" TEXT;

-- DropTable
DROP TABLE "SessionHasSessionType";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_sessionTypeId_fkey" FOREIGN KEY ("sessionTypeId") REFERENCES "SessionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
