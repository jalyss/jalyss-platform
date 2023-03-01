-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_functionalAreaId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_jobTitleId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountBalance" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "educationLevelId" DROP NOT NULL,
ALTER COLUMN "functionalAreaId" DROP NOT NULL,
ALTER COLUMN "jobTitleId" DROP NOT NULL,
ALTER COLUMN "picture" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UserCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_functionalAreaId_fkey" FOREIGN KEY ("functionalAreaId") REFERENCES "FunctionalArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
