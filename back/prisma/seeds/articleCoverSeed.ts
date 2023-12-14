import { PrismaClient } from '@prisma/client';

export const articleCoverSeed = async (prisma: PrismaClient) => {
  const articles = await prisma.article.findMany({
    include: {
      publishingHouse: true,
    },
  });
  await Promise.all(
    articles.map(async (elem) => {
      const cover = await prisma.media.create({
        data: {
          path:
            process.env.SERVER_UPLOAD_CONFIG +
            'upload/articles/' +
            elem.publishingHouse.name +
            '/' +
            elem.title+'.jpeg',
          type: 'image',
          extension: 'jpeg',
        },
      });

      await prisma.article.update({
        where: {
          id: elem.id,
        },
        data: {
          coverId: cover.id,
        },
      });
    }),
  );
};
