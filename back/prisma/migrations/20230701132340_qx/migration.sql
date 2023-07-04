-- DropForeignKey
ALTER TABLE "ArticleByAuthor" DROP CONSTRAINT "ArticleByAuthor_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleByAuthor" DROP CONSTRAINT "ArticleByAuthor_authorId_fkey";

-- AddForeignKey
ALTER TABLE "ArticleByAuthor" ADD CONSTRAINT "ArticleByAuthor_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleByAuthor" ADD CONSTRAINT "ArticleByAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
