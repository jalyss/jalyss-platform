/*
  Warnings:

  - You are about to drop the column `groupeChatRoomId` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the `GroupeChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantChatroom` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `chatRoomId` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_groupeChatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantChatroom" DROP CONSTRAINT "ParticipantChatroom_GroupechatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantChatroom" DROP CONSTRAINT "ParticipantChatroom_userId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "groupeChatRoomId",
ALTER COLUMN "chatRoomId" SET NOT NULL;

-- DropTable
DROP TABLE "GroupeChatRoom";

-- DropTable
DROP TABLE "ParticipantChatroom";
