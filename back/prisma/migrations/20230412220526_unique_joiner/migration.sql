/*
  Warnings:

  - The primary key for the `UserChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserChatRoom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,chatRoomId]` on the table `UserChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserChatRoom" DROP CONSTRAINT "UserChatRoom_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserChatRoom_userId_chatRoomId_key" ON "UserChatRoom"("userId", "chatRoomId");
