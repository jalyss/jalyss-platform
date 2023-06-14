/*
  Warnings:

  - You are about to drop the column `image` on the `WorkSpace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "freeSpace" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN     "capacity" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "pricePerDay" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WorkSpace" DROP COLUMN "image",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "capacity" DROP NOT NULL,
ALTER COLUMN "capacity" SET DATA TYPE TEXT,
ALTER COLUMN "amenities" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "reviews" DROP NOT NULL,
ALTER COLUMN "reviews" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "MainComponent" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MainComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubComponent" (
    "id" TEXT NOT NULL,
    "mainComponentId" TEXT NOT NULL,

    CONSTRAINT "SubComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSubComponent" (
    "id" TEXT NOT NULL,
    "subComponentId" TEXT NOT NULL,

    CONSTRAINT "ContentSubComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_identifier_key" ON "Service"("identifier");

-- AddForeignKey
ALTER TABLE "SubComponent" ADD CONSTRAINT "SubComponent_mainComponentId_fkey" FOREIGN KEY ("mainComponentId") REFERENCES "MainComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentSubComponent" ADD CONSTRAINT "ContentSubComponent_subComponentId_fkey" FOREIGN KEY ("subComponentId") REFERENCES "SubComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
