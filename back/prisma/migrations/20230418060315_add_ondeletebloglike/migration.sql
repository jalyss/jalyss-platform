-- DropForeignKey
ALTER TABLE "BlogLike" DROP CONSTRAINT "BlogLike_LikeCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "BlogLike" ADD CONSTRAINT "BlogLike_LikeCategoryId_fkey" FOREIGN KEY ("LikeCategoryId") REFERENCES "LikeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
