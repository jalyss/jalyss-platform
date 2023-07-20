-- DropForeignKey
ALTER TABLE "LectureHasWhatYouWillLearn" DROP CONSTRAINT "LectureHasWhatYouWillLearn_WhatYouWillLearnId_fkey";

-- AddForeignKey
ALTER TABLE "LectureHasWhatYouWillLearn" ADD CONSTRAINT "LectureHasWhatYouWillLearn_WhatYouWillLearnId_fkey" FOREIGN KEY ("WhatYouWillLearnId") REFERENCES "WhatYouWillLearn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
