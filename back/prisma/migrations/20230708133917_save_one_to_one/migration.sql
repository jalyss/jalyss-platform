/*
  Warnings:

  - The primary key for the `UserChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserChatRoom` table. All the data in the column will be lost.
  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,chatRoomId]` on the table `UserChatRoom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_userChatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_userId_fkey";

-- DropIndex
DROP INDEX "UserChatRoom_chatRoomId_key";

-- AlterTable
ALTER TABLE "UserChatRoom" DROP CONSTRAINT "UserChatRoom_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Participants";

-- CreateIndex
CREATE UNIQUE INDEX "UserChatRoom_userId_chatRoomId_key" ON "UserChatRoom"("userId", "chatRoomId");

-- AddForeignKey
ALTER TABLE "UserChatRoom" ADD CONSTRAINT "UserChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
