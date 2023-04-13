/*
  Warnings:

  - You are about to drop the `workSpace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "workSpace";

-- CreateTable
CREATE TABLE "WorkSpace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,

    CONSTRAINT "WorkSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_workspaceId_key" ON "Booking"("userId", "workspaceId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
