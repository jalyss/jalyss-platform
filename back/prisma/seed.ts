import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  let users = [];
  let articles = [];
  // create 10 dummy users
  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: 'jaliss' + i + '@gmail.com',
          fullNameAr: `jalyss${i}`,
          fullNameEn: `jalyss${i}`,
          address: 'sfax',
          tel: '123456789',
          password: '1234',
        },
      }),
    );
  }
  //create dummy atricle Category
  let articleCategory1 = await prisma.articleCategory.create({
    data: {
      nameAr: 'تنمية بشرية',
      nameEn: 'Personal developement',
    },
  });
  let articleCategory2 = await prisma.articleCategory.create({
    data: {
      nameAr: 'ادارة الاعمال',
      nameEn: 'Business',
    },
  });
  let articleCategory3 = await prisma.articleCategory.create({
    data: {
      nameAr: 'وعي',
      nameEn: 'Awareness',
    },
  });
  let articleCategoryIds=[articleCategory1.id,articleCategory2.id,articleCategory3.id]
  //create dummy aarticle type
  let type = await prisma.type.create({
    data: {
      nameAr: 'كتب',
      nameEn: 'books',
    },
  });
  //create dummy publishing House
  let publishingHouse1 = await prisma.publishingHouse.create({
    data: {
      name: 'جرير',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
    },
  });
  let publishingHouse2 = await prisma.publishingHouse.create({
    data: {
      name: 'جبل عمان',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
    },
  });
  let publishingHouse3 = await prisma.publishingHouse.create({
    data: {
      name: 'ملهمون',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
    },
  });
  let publishinghouseIds = [publishingHouse1.id, publishingHouse2.id, publishingHouse3.id]
  // create 10 dummy articles
  let cover = await prisma.media.create({
    data:{
      type   :      'image',
      alt     :     'cover test',
      extension :   'jpg',
      description : 'cover test',
      path:`https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg`
    }
  })
  for (let i = 0; i < 20; i++) {
    articles.push(
      await prisma.article.create({
        data: {
          title: 'jalyss book ' + i,
          coverId: cover.id ,
          weight: 110,
          pageNumber :  255,
          code:`0000-${i}`,
          categoryId:articleCategoryIds[Math.floor(Math.random() *articleCategoryIds.length)],
          typeId: type.id,
          publishingHouseId: publishinghouseIds[Math.floor(Math.random() * publishinghouseIds.length)],
        },
      }),
    );
  }

  // create dummy branch
  let branch = await prisma.branch.create({
    data: {
      name: 'Tunis',
      identifier: 'TUN',
      address: 'sfax ambra immeuble ',
      mainBranch: true,
    },
  });
  let articlesByBranch = [];
  for (let i = 0; i < articles.length; i += 2) {
    articlesByBranch.push(
      await prisma.articlesByBranch.create({
        data: {
          branchId: branch.id,
          articleId: articles[i].id,
          price: 125.25,
          stock: 10,
        },
      }),
    );
  }

  console.log(users);
  console.log(articles);

  console.log(articlesByBranch);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
