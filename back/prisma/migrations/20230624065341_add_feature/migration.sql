-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeatureToSessionTarif" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToSessionTarif_AB_unique" ON "_FeatureToSessionTarif"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToSessionTarif_B_index" ON "_FeatureToSessionTarif"("B");

-- AddForeignKey
ALTER TABLE "_FeatureToSessionTarif" ADD CONSTRAINT "_FeatureToSessionTarif_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToSessionTarif" ADD CONSTRAINT "_FeatureToSessionTarif_B_fkey" FOREIGN KEY ("B") REFERENCES "SessionTarif"("id") ON DELETE CASCADE ON UPDATE CASCADE;
