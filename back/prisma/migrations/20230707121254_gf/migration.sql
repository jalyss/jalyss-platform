-- DropForeignKey
ALTER TABLE "ArticleByAuthor" DROP CONSTRAINT "ArticleByAuthor_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleByAuthor" DROP CONSTRAINT "ArticleByAuthor_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ArticlesByBranch" DROP CONSTRAINT "ArticlesByBranch_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticlesByBranch" DROP CONSTRAINT "ArticlesByBranch_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "ArticleByAuthor" ADD CONSTRAINT "ArticleByAuthor_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleByAuthor" ADD CONSTRAINT "ArticleByAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesByBranch" ADD CONSTRAINT "ArticlesByBranch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesByBranch" ADD CONSTRAINT "ArticlesByBranch_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
