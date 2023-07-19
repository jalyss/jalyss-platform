import { PrismaClient } from '@prisma/client';

export const chatSeed = async (prisma: PrismaClient, userIds: string[]) => {
  await prisma.chatRoom.create({
    data: {
      name: 'javaScript',
      isGroup:true,
      participants: {
        create: userIds.map((userId) => ({ userId })),
      },
      messages:{
        create:{
            userId:userIds[0],
            text:'hello',
        }
      }
    },
  });
};
