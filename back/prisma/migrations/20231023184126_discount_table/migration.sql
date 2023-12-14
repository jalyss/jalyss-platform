/*
  Warnings:

  - You are about to drop the column `articleId` on the `Supply` table. All the data in the column will be lost.
  - The required column `id` was added to the `Supply` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `price` to the `Supply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Supply" DROP CONSTRAINT "Supply_articleId_fkey";

-- DropIndex
DROP INDEX "Supply_articleId_providerId_dateTime_key";

-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "discountCodeId" TEXT;

-- AlterTable
ALTER TABLE "Supply" DROP COLUMN "articleId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "Supply_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ProposalFunctionalArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ProposalFunctionalArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalJobTitle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ProposalJobTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalEducationLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ProposalEducationLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountCode" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DiscountCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplyLine" (
    "supplyId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DebtPayments" (
    "id" TEXT NOT NULL,
    "commandId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "client_id" TEXT,

    CONSTRAINT "DebtPayments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscountCode_code_key" ON "DiscountCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SupplyLine_articleId_supplyId_key" ON "SupplyLine"("articleId", "supplyId");

-- AddForeignKey
ALTER TABLE "ProposalFunctionalArea" ADD CONSTRAINT "ProposalFunctionalArea_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalJobTitle" ADD CONSTRAINT "ProposalJobTitle_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalEducationLevel" ADD CONSTRAINT "ProposalEducationLevel_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountCode" ADD CONSTRAINT "DiscountCode_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyLine" ADD CONSTRAINT "SupplyLine_supplyId_fkey" FOREIGN KEY ("supplyId") REFERENCES "Supply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyLine" ADD CONSTRAINT "SupplyLine_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_discountCodeId_fkey" FOREIGN KEY ("discountCodeId") REFERENCES "DiscountCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebtPayments" ADD CONSTRAINT "DebtPayments_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebtPayments" ADD CONSTRAINT "DebtPayments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
