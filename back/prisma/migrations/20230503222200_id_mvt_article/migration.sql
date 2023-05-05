-- CreateTable
CREATE TABLE "MvtArticle" (
    "id" TEXT NOT NULL,
    "branchSenderId" TEXT NOT NULL,
    "branchReceiverId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MvtArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MvtArticle_branchReceiverId_branchSenderId_articleId_date_key" ON "MvtArticle"("branchReceiverId", "branchSenderId", "articleId", "date");

-- AddForeignKey
ALTER TABLE "MvtArticle" ADD CONSTRAINT "MvtArticle_branchSenderId_fkey" FOREIGN KEY ("branchSenderId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MvtArticle" ADD CONSTRAINT "MvtArticle_branchReceiverId_fkey" FOREIGN KEY ("branchReceiverId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MvtArticle" ADD CONSTRAINT "MvtArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
