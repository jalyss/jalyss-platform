-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_nextSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_previousSessionId_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "nextSessionId" DROP NOT NULL,
ALTER COLUMN "previousSessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_previousSessionId_fkey" FOREIGN KEY ("previousSessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_nextSessionId_fkey" FOREIGN KEY ("nextSessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
