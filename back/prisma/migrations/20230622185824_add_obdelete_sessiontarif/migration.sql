-- DropForeignKey
ALTER TABLE "SessionTarif" DROP CONSTRAINT "SessionTarif_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "SessionTarif" ADD CONSTRAINT "SessionTarif_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
