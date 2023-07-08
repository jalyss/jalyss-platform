/*
  Warnings:

  - The `userId` column on the `UserChatRoom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "UserChatRoom" DROP CONSTRAINT "UserChatRoom_userId_fkey";

-- AlterTable
ALTER TABLE "UserChatRoom" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "UserChatRoom_userId_chatRoomId_key" ON "UserChatRoom"("userId", "chatRoomId");

-- AddForeignKey
ALTER TABLE "UserChatRoom" ADD CONSTRAINT "UserChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
