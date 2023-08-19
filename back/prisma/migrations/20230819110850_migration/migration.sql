/*
  Warnings:

  - You are about to drop the column `labelAr` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `labelEn` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `contentAr` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `contentEn` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `titleAr` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `contentAr` on the `Prerequire` table. All the data in the column will be lost.
  - You are about to drop the column `contentEn` on the `Prerequire` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionAr` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionEn` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `titleAr` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `titleAr` on the `SessionTarif` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `SessionTarif` table. All the data in the column will be lost.
  - You are about to drop the column `titleAr` on the `SessionType` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `SessionType` table. All the data in the column will be lost.
  - You are about to drop the column `contentAr` on the `WhatYouWillLearn` table. All the data in the column will be lost.
  - You are about to drop the column `contentEn` on the `WhatYouWillLearn` table. All the data in the column will be lost.
  - Added the required column `label` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Prerequire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SessionTarif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SessionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `WhatYouWillLearn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "labelAr",
DROP COLUMN "labelEn",
ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "contentAr",
DROP COLUMN "contentEn",
DROP COLUMN "titleAr",
DROP COLUMN "titleEn",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prerequire" DROP COLUMN "contentAr",
DROP COLUMN "contentEn",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "descriptionAr",
DROP COLUMN "descriptionEn",
DROP COLUMN "titleAr",
DROP COLUMN "titleEn",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SessionTarif" DROP COLUMN "titleAr",
DROP COLUMN "titleEn",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SessionType" DROP COLUMN "titleAr",
DROP COLUMN "titleEn",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WhatYouWillLearn" DROP COLUMN "contentAr",
DROP COLUMN "contentEn",
ADD COLUMN     "content" TEXT NOT NULL;
