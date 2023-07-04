-- DropForeignKey
ALTER TABLE "ArticlesByBranch" DROP CONSTRAINT "ArticlesByBranch_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticlesByBranch" DROP CONSTRAINT "ArticlesByBranch_branchId_fkey";

-- AddForeignKey
ALTER TABLE "ArticlesByBranch" ADD CONSTRAINT "ArticlesByBranch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesByBranch" ADD CONSTRAINT "ArticlesByBranch_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
