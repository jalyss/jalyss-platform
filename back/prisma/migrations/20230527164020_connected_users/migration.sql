-- CreateTable
CREATE TABLE "ConnetedUser" (
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConnetedUser_userId_key" ON "ConnetedUser"("userId");

-- AddForeignKey
ALTER TABLE "ConnetedUser" ADD CONSTRAINT "ConnetedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
