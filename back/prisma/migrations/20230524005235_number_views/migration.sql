/*
  Warnings:

  - Added the required column `coverId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `View` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "coverId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;



-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
