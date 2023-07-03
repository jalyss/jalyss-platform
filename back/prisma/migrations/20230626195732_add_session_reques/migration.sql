/*
  Warnings:

  - Added the required column `resumeId` to the `SessionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionRequest" ADD COLUMN     "resumeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SessionRequest" ADD CONSTRAINT "SessionRequest_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
