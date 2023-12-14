/*
  Warnings:

  - Added the required column `code` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Client_email_key";

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "nameFr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "registrationNumber" TEXT,
ALTER COLUMN "fullNameEn" SET DEFAULT 'NameEn',
ALTER COLUMN "fullNameAr" SET DEFAULT 'NameAr',
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" SET DEFAULT 'Tunisia',
ALTER COLUMN "tel" SET DEFAULT '00000000',
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Command" ALTER COLUMN "client_address" SET DEFAULT 'Tunisia',
ALTER COLUMN "client_tel" SET DEFAULT '00000000',
ALTER COLUMN "client_email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "nameFr" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProposalCountry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ProposalCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalCity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ProposalCity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProposalCountry" ADD CONSTRAINT "ProposalCountry_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalCity" ADD CONSTRAINT "ProposalCity_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalCity" ADD CONSTRAINT "ProposalCity_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
