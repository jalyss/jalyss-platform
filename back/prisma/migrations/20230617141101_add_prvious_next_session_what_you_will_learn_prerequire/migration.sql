/*
  Warnings:

  - Added the required column `categoryId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextSessionId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousSessionId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "nextSessionId" TEXT NOT NULL,
ADD COLUMN     "previousSessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WhatYouWillLearn" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "WhatYouWillLearn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prerequire" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Prerequire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SessionToWhatYouWillLearn" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PrerequireToSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MediaToSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SessionToWhatYouWillLearn_AB_unique" ON "_SessionToWhatYouWillLearn"("A", "B");

-- CreateIndex
CREATE INDEX "_SessionToWhatYouWillLearn_B_index" ON "_SessionToWhatYouWillLearn"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PrerequireToSession_AB_unique" ON "_PrerequireToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_PrerequireToSession_B_index" ON "_PrerequireToSession"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MediaToSession_AB_unique" ON "_MediaToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaToSession_B_index" ON "_MediaToSession"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_previousSessionId_fkey" FOREIGN KEY ("previousSessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_nextSessionId_fkey" FOREIGN KEY ("nextSessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToWhatYouWillLearn" ADD CONSTRAINT "_SessionToWhatYouWillLearn_A_fkey" FOREIGN KEY ("A") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionToWhatYouWillLearn" ADD CONSTRAINT "_SessionToWhatYouWillLearn_B_fkey" FOREIGN KEY ("B") REFERENCES "WhatYouWillLearn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrerequireToSession" ADD CONSTRAINT "_PrerequireToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Prerequire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrerequireToSession" ADD CONSTRAINT "_PrerequireToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToSession" ADD CONSTRAINT "_MediaToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToSession" ADD CONSTRAINT "_MediaToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
