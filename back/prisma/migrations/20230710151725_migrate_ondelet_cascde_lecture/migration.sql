-- DropForeignKey
ALTER TABLE "Assessments" DROP CONSTRAINT "Assessments_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "SessionHasLecture" DROP CONSTRAINT "SessionHasLecture_lectureId_fkey";

-- AddForeignKey
ALTER TABLE "SessionHasLecture" ADD CONSTRAINT "SessionHasLecture_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
