/*
  Warnings:

  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `accountBalance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `functionalAreaId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_intermediate_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_functionalAreaId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_jobTitleId_fkey";

-- DropForeignKey
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_userId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountBalance",
DROP COLUMN "address",
DROP COLUMN "categoryId",
DROP COLUMN "cityId",
DROP COLUMN "countryId",
DROP COLUMN "educationLevelId",
DROP COLUMN "functionalAreaId",
DROP COLUMN "jobTitleId",
DROP COLUMN "tel",
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "isClient" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "UserPayment";

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "fullNameEn" TEXT NOT NULL,
    "fullNameAr" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "avatarId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountBalance" DOUBLE PRECISION,
    "categoryId" TEXT,
    "educationLevelId" TEXT,
    "functionalAreaId" TEXT,
    "jobTitleId" TEXT,
    "countryId" TEXT,
    "cityId" TEXT,
    "isCoach" BOOLEAN DEFAULT false,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientPayment" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UserCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_functionalAreaId_fkey" FOREIGN KEY ("functionalAreaId") REFERENCES "FunctionalArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_intermediate_id_fkey" FOREIGN KEY ("intermediate_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPayment" ADD CONSTRAINT "ClientPayment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
