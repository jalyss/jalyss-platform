/*
  Warnings:

  - You are about to drop the `ConnetedUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConnetedUser" DROP CONSTRAINT "ConnetedUser_userId_fkey";

-- DropTable
DROP TABLE "ConnetedUser";

-- CreateTable
CREATE TABLE "ConnectedUser" (
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConnectedUser_userId_key" ON "ConnectedUser"("userId");

-- AddForeignKey
ALTER TABLE "ConnectedUser" ADD CONSTRAINT "ConnectedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
