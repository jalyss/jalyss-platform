-- AlterTable
ALTER TABLE "WorkSpace" ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "MediaWorkSpace" (
    "workspaceId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaWorkSpace_mediaId_workspaceId_key" ON "MediaWorkSpace"("mediaId", "workspaceId");

-- AddForeignKey
ALTER TABLE "MediaWorkSpace" ADD CONSTRAINT "MediaWorkSpace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaWorkSpace" ADD CONSTRAINT "MediaWorkSpace_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpace" ADD CONSTRAINT "WorkSpace_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
