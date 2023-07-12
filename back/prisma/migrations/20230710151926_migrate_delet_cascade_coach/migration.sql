-- DropForeignKey
ALTER TABLE "Coaching" DROP CONSTRAINT "Coaching_lectureId_fkey";

-- AddForeignKey
ALTER TABLE "Coaching" ADD CONSTRAINT "Coaching_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
