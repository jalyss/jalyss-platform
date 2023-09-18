/*
  Warnings:

  - The primary key for the `MvtArticle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchReceiverId` on the `MvtArticle` table. All the data in the column will be lost.
  - You are about to drop the column `branchSenderId` on the `MvtArticle` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `MvtArticle` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MvtArticle` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `MvtArticle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[articleId,transactionId]` on the table `MvtArticle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionId` to the `MvtArticle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MvtArticle" DROP CONSTRAINT "MvtArticle_branchReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "MvtArticle" DROP CONSTRAINT "MvtArticle_branchSenderId_fkey";

-- DropIndex
DROP INDEX "MvtArticle_branchReceiverId_branchSenderId_articleId_date_key";

-- AlterTable
ALTER TABLE "MvtArticle" DROP CONSTRAINT "MvtArticle_pkey",
DROP COLUMN "branchReceiverId",
DROP COLUMN "branchSenderId",
DROP COLUMN "date",
DROP COLUMN "id",
DROP COLUMN "status",
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "branchSenderId" TEXT NOT NULL,
    "branchReceiverId" TEXT NOT NULL,
    "status" "StatusMvt" NOT NULL DEFAULT 'pending',
    "reason" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_branchReceiverId_branchSenderId_date_key" ON "Transaction"("branchReceiverId", "branchSenderId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "MvtArticle_articleId_transactionId_key" ON "MvtArticle"("articleId", "transactionId");

-- AddForeignKey
ALTER TABLE "MvtArticle" ADD CONSTRAINT "MvtArticle_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_branchSenderId_fkey" FOREIGN KEY ("branchSenderId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_branchReceiverId_fkey" FOREIGN KEY ("branchReceiverId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
