/*
  Warnings:

  - Made the column `chatRoomId` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatRoomId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "chatRoomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
