/*
  Warnings:

  - You are about to drop the column `logo` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "logo",
ADD COLUMN     "logoId" TEXT;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
