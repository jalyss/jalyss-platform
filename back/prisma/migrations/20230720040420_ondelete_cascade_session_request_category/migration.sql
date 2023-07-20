-- DropForeignKey
ALTER TABLE "RequestCategories" DROP CONSTRAINT "RequestCategories_sessionRequestId_fkey";

-- AddForeignKey
ALTER TABLE "RequestCategories" ADD CONSTRAINT "RequestCategories_sessionRequestId_fkey" FOREIGN KEY ("sessionRequestId") REFERENCES "SessionRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
