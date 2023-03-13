-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_countryId_fkey";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "countryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Command" ALTER COLUMN "cityId" DROP NOT NULL,
ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
