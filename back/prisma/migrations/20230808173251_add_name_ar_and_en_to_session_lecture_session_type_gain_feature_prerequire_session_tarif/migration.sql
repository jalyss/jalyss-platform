/*
  Warnings:

  - You are about to drop the column `label` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Prerequire` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SessionTarif` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SessionType` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `WhatYouWillLearn` table. All the data in the column will be lost.
  - Added the required column `labelAr` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelEn` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentAr` to the `Prerequire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentEn` to the `Prerequire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `SessionTarif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `SessionTarif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `SessionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `SessionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentAr` to the `WhatYouWillLearn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentEn` to the `WhatYouWillLearn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "label",
ADD COLUMN     "labelAr" TEXT NOT NULL,
ADD COLUMN     "labelEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "title",
ADD COLUMN     "titleAr" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prerequire" DROP COLUMN "content",
ADD COLUMN     "contentAr" TEXT NOT NULL,
ADD COLUMN     "contentEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "title",
ADD COLUMN     "titleAr" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SessionTarif" DROP COLUMN "title",
ADD COLUMN     "titleAr" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SessionType" DROP COLUMN "title",
ADD COLUMN     "titleAr" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WhatYouWillLearn" DROP COLUMN "content",
ADD COLUMN     "contentAr" TEXT NOT NULL,
ADD COLUMN     "contentEn" TEXT NOT NULL;
