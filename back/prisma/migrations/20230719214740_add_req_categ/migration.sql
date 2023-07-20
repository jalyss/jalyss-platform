-- CreateTable
CREATE TABLE "RequestCategories" (
    "sessionRequestId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestCategories_categoryId_sessionRequestId_key" ON "RequestCategories"("categoryId", "sessionRequestId");

-- AddForeignKey
ALTER TABLE "RequestCategories" ADD CONSTRAINT "RequestCategories_sessionRequestId_fkey" FOREIGN KEY ("sessionRequestId") REFERENCES "SessionRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestCategories" ADD CONSTRAINT "RequestCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
