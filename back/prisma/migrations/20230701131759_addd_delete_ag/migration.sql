-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
