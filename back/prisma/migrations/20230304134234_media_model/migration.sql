/*
  Warnings:

  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "picture",
ADD COLUMN     "avatarId" TEXT;

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaUser" (
    "mediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MediaArticle" (
    "mediaId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaUser_mediaId_userId_key" ON "MediaUser"("mediaId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "MediaArticle_mediaId_articleId_key" ON "MediaArticle"("mediaId", "articleId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaUser" ADD CONSTRAINT "MediaUser_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaUser" ADD CONSTRAINT "MediaUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaArticle" ADD CONSTRAINT "MediaArticle_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaArticle" ADD CONSTRAINT "MediaArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
