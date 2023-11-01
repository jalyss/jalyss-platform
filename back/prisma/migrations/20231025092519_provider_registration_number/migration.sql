-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "registrationNumber" TEXT,
ALTER COLUMN "tel" SET DEFAULT '00000000',
ALTER COLUMN "email" DROP NOT NULL;
