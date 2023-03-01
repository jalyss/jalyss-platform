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
  let articleCategory = await prisma.articleCategory.create({
    data: {
      nameAr: 'تنمية بشرية',
      nameEn: 'personal developement ',
    },
  });
  //create dummy aarticle type
  let type = await prisma.type.create({
    data: {
      nameAr: 'كتب',
      nameEn: 'books',
    },
  });
  //create dummy publishing House
  let publishingHouse = await prisma.publishingHouse.create({
    data: {
      name: 'جرير',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
    },
  });
  // create 10 dummy users
  for (let i = 0; i < 10; i++) {
    articles.push(
      await prisma.article.create({
        data: {
          name: 'jaliss book ' + i,
          cover: `https://www.skillsyouneed.com/images/maslow.png`,
          weight: 110,
          categoryId: articleCategory.id,
          typeId: type.id,
          publishingHouseId: publishingHouse.id,
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
  for (let i = 0; i < articles.length; i+= 2) {    
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