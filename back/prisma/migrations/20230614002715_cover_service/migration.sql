-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "coverId" TEXT;

-- CreateTable
CREATE TABLE "MediaService" (
    "serviceId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaService_mediaId_serviceId_key" ON "MediaService"("mediaId", "serviceId");

-- AddForeignKey
ALTER TABLE "MediaService" ADD CONSTRAINT "MediaService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaService" ADD CONSTRAINT "MediaService_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
