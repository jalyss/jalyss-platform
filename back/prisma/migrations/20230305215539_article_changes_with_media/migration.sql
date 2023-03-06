/*
  Warnings:

  - You are about to drop the column `cover` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `long_desc` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `short_desc` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageNumber` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `weight` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "cover",
DROP COLUMN "long_desc",
DROP COLUMN "short_desc",
ADD COLUMN     "coverId" TEXT,
ADD COLUMN     "long_desc_ar" TEXT,
ADD COLUMN     "long_desc_en" TEXT,
ADD COLUMN     "pageNumber" INTEGER NOT NULL,
ADD COLUMN     "short_desc_ar" TEXT,
ADD COLUMN     "short_desc_en" TEXT,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "code" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_code_key" ON "Article"("code");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
