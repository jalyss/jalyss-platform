import { PrismaClient } from '@prisma/client';

export const paymentChoiceSeed = async (prisma: PrismaClient) => {
  await prisma.paymentChoice.createMany({
    data: [
      {
        nameAr: 'ت.ب.و',
        nameEn: 'TPE',
      },
      {
        nameAr: 'ارسال بكني',
        nameEn: 'Bank transfer',
      },
      {
        nameAr: 'عند التوصيل',
        nameEn: 'Cash with tranporter',
      },
      {
        nameAr: 'صك',
        nameEn: 'check',
      },
      {
        nameAr: 'نقدا',
        nameEn: 'cash',
      },
    ],
  });
};
