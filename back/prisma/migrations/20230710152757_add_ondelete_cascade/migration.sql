-- DropForeignKey
ALTER TABLE "LectureHasWhatYouWillLearn" DROP CONSTRAINT "LectureHasWhatYouWillLearn_lectureId_fkey";

-- AddForeignKey
ALTER TABLE "LectureHasWhatYouWillLearn" ADD CONSTRAINT "LectureHasWhatYouWillLearn_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
