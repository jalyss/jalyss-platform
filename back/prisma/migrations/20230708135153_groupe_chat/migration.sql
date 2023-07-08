-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "groupeChatRoomId" TEXT;

-- CreateTable
CREATE TABLE "GroupeChatRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupeChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantChatroom" (
    "userId" TEXT NOT NULL,
    "GroupechatRoomId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantChatroom_userId_GroupechatRoomId_key" ON "ParticipantChatroom"("userId", "GroupechatRoomId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_groupeChatRoomId_fkey" FOREIGN KEY ("groupeChatRoomId") REFERENCES "GroupeChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantChatroom" ADD CONSTRAINT "ParticipantChatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantChatroom" ADD CONSTRAINT "ParticipantChatroom_GroupechatRoomId_fkey" FOREIGN KEY ("GroupechatRoomId") REFERENCES "GroupeChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
