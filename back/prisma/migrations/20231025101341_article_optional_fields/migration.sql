-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_typeId_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "pageNumber" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
