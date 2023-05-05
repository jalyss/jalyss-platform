-- CreateEnum
CREATE TYPE "StatusMvt" AS ENUM ('pending', 'in_progress', 'on_hold', 'delivered');

-- AlterTable
ALTER TABLE "MvtArticle" ADD COLUMN     "status" "StatusMvt" NOT NULL DEFAULT 'pending';
