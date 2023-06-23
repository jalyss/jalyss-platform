import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  let users = [];
  let articles = [];

  // create dummy branch
  let branch = await prisma.branch.create({
    data: {
      name: 'Tunis',
      identifier: 'TUN',
      address: 'sfax ambra immeuble ',
      mainBranch: true,
    },
  });
  // create 10 dummy users
  const salt = await bcrypt.genSalt();
  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: 'jaliss' + i + '@gmail.com',
          fullNameAr: `جليس ${i}`,
          fullNameEn: `jalyss${i}`,
          address: 'sfax',
          tel: '123456789',
          password: await bcrypt.hash('1234', salt),
        },
      }),
    );
  }

  //create roles
  let managerRole = await prisma.role.create({
    data: {
      nameAr: 'المدير',
      nameEn: 'CEO',
      permissions: [
        { domain: 'employee', action: 'read' },
        { domain: 'employee', action: 'create' },
        { domain: 'employee', action: 'update' },
        { domain: 'employee', action: 'delete' },
        { domain: 'blog', action: 'read' },
        { domain: 'blog', action: 'update' },
        { domain: 'blog', action: 'delete' },
      ],
    },
  });
  let itManagerRole = await prisma.role.create({
    data: {
      nameAr: 'مسؤول الاعلامية',
      nameEn: 'It Manager',
      permissions: [
        { domain: 'employee', action: 'read' },
        { domain: 'employee', action: 'create' },
        { domain: 'employee', action: 'update' },
        { domain: 'employee', action: 'delete' },
        { domain: 'blog', action: 'read' },
        { domain: 'blog', action: 'update' },
        { domain: 'blog', action: 'delete' },
      ],
    },
  });
  let hrManagerRole = await prisma.role.create({
    data: {
      nameAr: 'مسؤول الموارد البشرية',
      nameEn: 'HR Manager',
      permissions: [
        { domain: 'blog', action: 'read' },
        { domain: 'blog', action: 'update' },
        { domain: 'blog', action: 'delete' },
      ],
    },
  });
  let selesAgentRole = await prisma.role.create({
    data: {
      nameAr: 'رجل المبيعات',
      nameEn: 'Sales Agent',
      permissions: [
        { domain: 'blog', action: 'read' },
        { domain: 'blog', action: 'update' },
        { domain: 'blog', action: 'delete' },
      ],
    },
  });
  let groutAgentRole = await prisma.role.create({
    data: {
      nameAr: 'مسؤول التعليب',
      nameEn: 'Grout Agent',
      permissions: [
        { domain: 'blog', action: 'read' },
        { domain: 'blog', action: 'update' },
        { domain: 'blog', action: 'delete' },
      ],
    },
  });
  let developerRole = await prisma.role.create({
    data: {
      nameAr: 'مبرمج',
      nameEn: 'Developer',
      permissions: [
        { domain: 'blog', action: 'read' },
        { domain: 'blog', action: 'update' },
        { domain: 'blog', action: 'delete' },
      ],
    },
  });

  //creat mediasAvatarEmployee
  let mediasAvatarEmployee1 = await prisma.media.create({
    data: {
      path: 'https://imglarger.com/Images/before-after/ai-image-enlarger-1-before-2.jpg',
      type: 'image',
      extension: 'jpg',
    },
  });

  let mediasAvatarEmployee2 = await prisma.media.create({
    data: {
      path: 'https://stylesatlife.com/wp-content/uploads/2022/12/Haircuts-for-School-Boys-11.jpg.webp',
      type: 'image',
      extension: 'jpg',
    },
  });

  let mediasAvatarEmployee3 = await prisma.media.create({
    data: {
      path: 'https://media.istockphoto.com/id/1351445167/photo/happy-male-youngster-smiling-at-the-camera-outdoors.jpg?b=1&s=170667a&w=0&k=20&c=iebfRFHi1ncG_CNCZLmOSLnRI_TO0D4rACMbarHsADc=',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarEmployee4 = await prisma.media.create({
    data: {
      path: 'https://media.istockphoto.com/id/1159801546/photo/portrait-of-handsome-boy-posing-in-photo-studio.jpg?s=612x612&w=0&k=20&c=YLyXwo6WaVWv8j80fLEyPjOmp3--6VlVYRU-Eyco5eQ=',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarEmployee5 = await prisma.media.create({
    data: {
      path: 'https://blog.hootsuite.com/wp-content/uploads/2020/02/Image-copyright-556x556.png',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarEmployee6 = await prisma.media.create({
    data: {
      path: 'https://pixlr.com/images/index/remove-bg.webp',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarEmployee7 = await prisma.media.create({
    data: {
      path: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/cut-out-an-image/thumbnail.jpeg',
      type: 'image',
      extension: 'jpg',
    },
  });

  //create employees
  const saltEm = await bcrypt.genSalt();
  let manager = await prisma.employee.create({
    data: {
      fullNameAr: 'بسمة',
      fullNameEn: 'besma',
      email: 'besma@jalyss.com',
      address: 'tunis-kairouan',
      tel: '65555550',
      password: await bcrypt.hash('1234', saltEm),
      isAdmin: true,
      roleId: managerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee1.id,
    },
  });
  let developer1 = await prisma.employee.create({
    data: {
      fullNameAr: 'وسيم',
      fullNameEn: 'wassim',
      email: 'wassim@jalyss.com',
      address: 'tunis-carthage',
      tel: '45454545',
      password: await bcrypt.hash('1234', saltEm),
      roleId: developerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee2.id,
    },
  });
  let developer2 = await prisma.employee.create({
    data: {
      fullNameAr: 'غادة',
      fullNameEn: 'ghada',
      email: 'ghada@jalyss.com',
      address: 'Tunis',
      tel: '20202020',
      password: await bcrypt.hash('1234', saltEm),
      roleId: developerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee3.id,
    },
  });
  let itManager = await prisma.employee.create({
    data: {
      fullNameAr: 'خليل',
      fullNameEn: 'khalil',
      email: 'khalil@jalyss.com',
      address: 'tunis-soussa',
      tel: '60606060',
      password: await bcrypt.hash('1234', saltEm),
      roleId: itManagerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee4.id,
    },
  });

  let groutAgent = await prisma.employee.create({
    data: {
      fullNameAr: 'ناديه',
      fullNameEn: 'nedia',
      email: 'nedia@jalyss.com',
      address: 'Tunis-Monastir',
      tel: '78787878',
      password: await bcrypt.hash('1234', saltEm),
      roleId: groutAgentRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee5.id,
    },
  });
  let sellesAgent = await prisma.employee.create({
    data: {
      fullNameAr: 'اماني',
      fullNameEn: 'ameni',
      email: 'ameni@jalyss.com',
      address: 'Tunis-Monastir',
      tel: '96969696',
      password: await bcrypt.hash('1234', saltEm),
      roleId: selesAgentRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee6.id,
    },
  });
  let hrManager = await prisma.employee.create({
    data: {
      fullNameAr: 'ابتسام',
      fullNameEn: 'ibtisem',
      email: 'ibtisem@jalyss.com',
      address: 'tunis-elkef',
      tel: '6777760',
      password: await bcrypt.hash('1234', saltEm),
      roleId: hrManagerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee7.id,
    },
  });
  //create dummy country
  let country1 = await prisma.country.create({
    data: {
      nameAr: 'تونس ',
      nameEn: ' Tunisia',
    },
  });

  let country2 = await prisma.country.create({
    data: {
      nameAr: 'المغرب',
      nameEn: ' Marroc',
    },
  });
  //
  let city1 = await prisma.city.create({
    data: {
      nameAr: 'تونس',
      nameEn: 'Tunis',
      countryId: country1.id,
    },
  });
  let city2 = await prisma.city.create({
    data: {
      nameAr: 'صفاقس',
      nameEn: 'Sfax',
      countryId: country1.id,
    },
  });
  let countryIds = [country1.id, country2.id];
  let cityIds = [city1.id, city2.id];

  //create dummy author
  let author1 = await prisma.author.create({
    data: {
      nameAr: ' داير واين',
      nameEn: ' Wayne Dyer',
      biographyAr: ',',
      biographyEn: ',',
    },
  });

  let author2 = await prisma.author.create({
    data: {
      nameAr: 'كوفي ستيفن',
      nameEn: ' Stephen Covey',
      biographyAr: ',',
      biographyEn: ',',
    },
  });

  let author3 = await prisma.author.create({
    data: {
      nameAr: ' شوبرا ديباك',
      nameEn: ' Deepak Chopra',
      biographyAr: ',',
      biographyEn: ',',
    },
  });
  let authorIds = [author1.id, author2.id, author3.id];

  //create dummy article Category
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
  let articleCategory4 = await prisma.articleCategory.create({
    data: {
      nameAr: 'وعي',
      nameEn: 'Psychology',
    },
  });
  let articleCategory5 = await prisma.articleCategory.create({
    data: {
      nameAr: 'وعي',
      nameEn: 'Novels',
    },
  });
  let articleCategory6 = await prisma.articleCategory.create({
    data: {
      nameAr: 'وعي',
      nameEn: 'Philosophy',
    },
  });
  let articleCategoryIds = [
    articleCategory1.id,
    articleCategory2.id,
    articleCategory3.id,
  ];
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
      logo: 'https://jalyss.com/img/m/3.jpg',
    },
  });
  let publishingHouse3 = await prisma.publishingHouse.create({
    data: {
      name: 'ملهمون',
      address: 'Saudi arabic',
      logo: 'https://jalyss.com/img/m/21.jpg',
    },
  });
  let publishingHouse4 = await prisma.publishingHouse.create({
    data: {
      name: 'دار الشروق',
      address: 'Saudi arabic',
      logo: 'https://jalyss.com/img/m/4.jpg',
    },
  });
  let publishingHouse5 = await prisma.publishingHouse.create({
    data: {
      name: 'دار الكتاب العربي',
      address: 'Saudi arabic',
      logo: 'https://jalyss.com/img/m/31.jpg',
    },
  });
  let publishingHouse6 = await prisma.publishingHouse.create({
    data: {
      name: 'دار الفراشة',
      address: 'Saudi arabic',
      logo: 'https://jalyss.com/img/m/26.jpg',
    },
  });
  let publishingHouse7 = await prisma.publishingHouse.create({
    data: {
      name: 'دار المعارف',
      address: 'Saudi arabic',
      logo: 'https://jalyss.com/img/m/15.jpg',
    },
  });
  let publishingHouse8 = await prisma.publishingHouse.create({
    data: {
      name: ' دار الآداب',
      address: 'Saudi arabic',
      logo: 'https://jalyss.com/img/m/5.jpg',
    },
  });
  let publishinghouseIds = [
    publishingHouse1.id,
    publishingHouse2.id,
    publishingHouse3.id,
    publishingHouse4.id,
    publishingHouse5.id,
    publishingHouse6.id,
    publishingHouse7.id,
    publishingHouse8.id,
  ];

  // create 10 dummy cover
  let cover = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg`,
    },
  });
  let cover1 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/584-home_default/letting-go.jpg`,
    },
  });
  let cover2 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/520-home_default/alabe-alghani-alabe-alfaker.jpg`,
    },
  });
  let cover3 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/583-home_default/The-Power-of-Now.jpg`,
    },
  });
  let cover4 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/544-home_default/assrare-aakle-almelioneur.jpg`,
    },
  });
  let cover5 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/743-home_default/the-7-habits-of-highly-effective-people-stephen-r-covey.jpg`,
    },
  });
  let cover6 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/542-home_default/Think-and-Grow-Rich.jpg`,
    },
  });
  let cover7 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/1442-home_default/kouaat-aaleka-albaten.jpg`,
    },
  });
  let cover8 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/751-home_default/the-power-of-habit.jpg`,
    },
  });
  let cover9 = await prisma.media.create({
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/481-home_default/-.jpg`,
    },
  });

  //dummy articles

  let article1 = await prisma.article.create({
    data: {
      title: 'Book1',
      coverId: cover.id,
      weight: 110,
      pageNumber: 330,
      code: '000-1',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article2 = await prisma.article.create({
    data: {
      title: 'Book2',
      coverId: cover1.id,
      weight: 110,
      pageNumber: 344,
      code: '000-2',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article3 = await prisma.article.create({
    data: {
      title: 'Book3',
      coverId: cover2.id,
      weight: 110,
      pageNumber: 214,
      code: '000-3',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article4 = await prisma.article.create({
    data: {
      title: 'Book4',
      coverId: cover3.id,
      weight: 110,
      pageNumber: 340,
      code: '000-4',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article5 = await prisma.article.create({
    data: {
      title: 'Book5',
      coverId: cover4.id,
      weight: 110,
      pageNumber: 233,
      code: '000-5',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article6 = await prisma.article.create({
    data: {
      title: 'Book6',
      coverId: cover5.id,
      weight: 110,
      pageNumber: 223,
      code: '000-6',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article7 = await prisma.article.create({
    data: {
      title: 'Book7',
      coverId: cover6.id,
      weight: 110,
      pageNumber: 322,
      code: '000-7',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article8 = await prisma.article.create({
    data: {
      title: 'Book8',
      coverId: cover7.id,
      weight: 110,
      pageNumber: 247,
      code: '000-8',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article9 = await prisma.article.create({
    data: {
      title: 'Book9',
      coverId: cover8.id,
      weight: 110,
      pageNumber: 310,
      code: '000-9',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article10 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover9.id,
      weight: 110,
      pageNumber: 230,
      code: '000-10',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let article11 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover.id,
      weight: 110,
      pageNumber: 230,
      code: '000-11',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article12 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover1.id,
      weight: 110,
      pageNumber: 230,
      code: '000-12',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article13 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover2.id,
      weight: 110,
      pageNumber: 230,
      code: '000-13',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article14 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover3.id,
      weight: 110,
      pageNumber: 230,
      code: '000-14',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article15 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover4.id,
      weight: 110,
      pageNumber: 230,
      code: '000-15',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article16 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover5.id,
      weight: 110,
      pageNumber: 230,
      code: '000-16',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article17 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover6.id,
      weight: 110,
      pageNumber: 230,
      code: '000-17',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article18 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover7.id,
      weight: 110,
      pageNumber: 230,
      code: '000-18',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article19 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover8.id,
      weight: 110,
      pageNumber: 230,
      code: '000-19',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });
  let article20 = await prisma.article.create({
    data: {
      title: 'Book10',
      coverId: cover9.id,
      weight: 110,
      pageNumber: 230,
      code: '000-20',
      ArticleByAuthor: {
        create: {
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        },
      },
      categoryId:
        articleCategoryIds[
          Math.floor(Math.random() * articleCategoryIds.length)
        ],
      typeId: type.id,
      publishingHouseId:
        publishinghouseIds[
          Math.floor(Math.random() * publishinghouseIds.length)
        ],
    },
  });

  let articlesIds = [
    article1.id,
    article2.id,
    article3.id,
    article4.id,
    article5.id,
    article6.id,
    article7.id,
    article8.id,
    article9.id,
    article10.id,
    article11.id,
    article12.id,
    article13.id,
    article14.id,
    article15.id,
    article16.id,
    article17.id,
    article18.id,
    article19.id,
    article20.id,
  ];

  // create dummy branch

  let mainBranch = await prisma.branch.create({
    data: {
      name: 'Main',
      identifier: 'Main',
      address: 'sfax ambra immeuble ',
      mainBranch: true,
    },
  });
  let maBranch = await prisma.branch.create({
    data: {
      name: 'Marroco',
      identifier: 'Ma',
      address: 'Marrakch ',
      mainBranch: true,
    },
  });

  let articlesBybranch1 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article1.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch2 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article2.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch3 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article3.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch4 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article4.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch5 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article5.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch6 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article6.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch7 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article7.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch8 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article8.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch9 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article9.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch10 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article10.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch11 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article11.id,
      price: 130.0,
      stock: 80,
    },
  });
  let articlesBybranch12 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article12.id,
      price: 130.0,
      stock: 45,
    },
  });
  let articlesBybranch13 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article13.id,
      price: 130.0,
      stock: 60,
    },
  });
  let articlesBybranch14 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article14.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch15 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article15.id,
      price: 130.0,
      stock: 50,
    },
  });
  let articlesBybranch16 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article16.id,
      price: 130.0,
      stock: 25,
    },
  });
  let articlesBybranch17 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article17.id,
      price: 130.0,
      stock: 20,
    },
  });
  let articlesBybranch18 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article18.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesBybranch19 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article19.id,
      price: 130.0,
      stock: 60,
    },
  });
  let articlesBybranch20 = await prisma.articlesByBranch.create({
    data: {
      branchId: branch.id,
      articleId: article20.id,
      price: 130.0,
      stock: 40,
    },
  });
  let articlesByBranchIds = [
    articlesBybranch1.id,
    articlesBybranch2.id,
    articlesBybranch3.id,
    articlesBybranch4.id,
    articlesBybranch5.id,
    articlesBybranch6.id,
    articlesBybranch7.id,
    articlesBybranch8.id,
    articlesBybranch9.id,
    articlesBybranch10.id,
    articlesBybranch11.id,
    articlesBybranch12.id,
    articlesBybranch13.id,
    articlesBybranch14.id,
    articlesBybranch15.id,
    articlesBybranch16.id,
    articlesBybranch17.id,
    articlesBybranch18.id,
    articlesBybranch19.id,
    articlesBybranch20.id,
  ];

  // await prisma.articlesByBranch.create({
  // data: {
  // branchId: mainBranch.id,
  // articleId: articlesIds[Math.floor(Math.random() * articlesIds.length)],
  //price: 130.00,
  //stock: 40,

  //},
  //})

  //create dummy orders
  let commands = [];
  for (let i = 0; i < 10; i++) {
    commands.push(
      await prisma.command.create({
        data: {
          clientName: 'client' + i,
          clientAddress: 'Lac 2 Tunis',
          clientTel: '22222222',
          clientEmail: 'client' + i + '@gmail.com',
          branchId: branch.id,
          countryId: countryIds[Math.floor(Math.random() * countryIds.length)],
          cityId: cityIds[Math.floor(Math.random() * cityIds.length)],
        },
      }),
    );
  }

  // create dummy services
  let serviceIds = [];

  const serviceNames = ['Private Space', 'Meeting Space', 'Co-Working Zone'];
  let MediaServiceIds = [];

  for (let i = 0; i < 6; i++) {
    let media = await prisma.media.create({
      data: {
        path: 'https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
        extension: 'jpg',
        type: 'image',
      },
    });

    MediaServiceIds.push(media.id);
  }
  for (let i = 0; i < serviceNames.length; i++) {
    let service = await prisma.service.create({
      data: {
        MediaService: {
          create: MediaServiceIds.map((mediaId) => ({ mediaId })),
        },
        cover: {
          create: {
            alt: serviceNames[i],
            extension: 'jpg',
            type: 'image',
            path: 'https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png',
          },
        },
        perHour:i!==2?true:false,
        name: serviceNames[i],
        identifier: serviceNames[i].replace(' ', '-').toLowerCase(),
        
      },
    });

    serviceIds.push(service.id);
  }

  console.log(serviceIds);

  let workSpacePrivateSpace = await prisma.workSpace.create({
    data: {
      name: 'bureau sfax',

      serviceId: serviceIds[0],
    },
  });
  let workSpaceMeetingSpace = await prisma.workSpace.create({
    data: {
      name: 'salle de reunion sfax',

      serviceId: serviceIds[1],
    },
  });

  let workSpaceCoworkingSpace = await prisma.workSpace.create({
    data: {
      name: 'open space sfax',

      serviceId: serviceIds[2],
    },
  });
  let tarifPrivateSpace1 = await prisma.tarif.create({
    data: {
      duration: 'trimestre(299DT)',
      price: 299,
      description: 'salle de reunion sfax',
      serviceId: serviceIds[0],
    },
  });

  let tarifPrivateSpace2 = await prisma.tarif.create({
    data: {
      duration: 'YEAR',
      price: 2777,
      description:
        'salle de reunion  sfax ',
      serviceId: serviceIds[0],
    },
  });
  let tarifMeetingSpace1 = await prisma.tarif.create({
    data: {
      name: 'Meeting Room',
      capacity: '2 to 4 people',
      price: 25,
      pricePerDay: 159,
      description: 'Optical fiber , Smart TV , White board',
      serviceId: serviceIds[1],
    },
  });
  let tarifMeetingSpace2 = await prisma.tarif.create({
    data: {
      name: 'Meeting Room',
      capacity: '6 to 8 people',
      price: 30,
      pricePerDay: 189,
      description: 'Optical fiber , Smart TV , White board',
      serviceId: serviceIds[1],
    },
  });
  let tarifMeetingSpace3 = await prisma.tarif.create({
    data: {
      name: 'Training Room',
      capacity: '15 people',
      price: 40,
      pricePerDay: 259,
      description: 'Optical fiber , Video Projector, White board',
      serviceId: serviceIds[1],
    },
  });
  let tarifCoWorkingZone1 = await prisma.tarif.create({
    data: {
      name: 'Day Pass',
      duration: 'Day',
      capacity: 'per persone',
      price: 25,
      description: 'Wifi , Café, Imprimante,Call box privée',
      serviceId: serviceIds[2],
    },
  });
  let tarifCoWorkingZone2 = await prisma.tarif.create({
    data: {
      name: 'Week Pass',
      duration: 'Week',
      capacity: 'per persone',
      price: 99,
      description:
        'Accès 24 hrs / 7 jrs , 2 sites de coworking, Salle de réunion a -40% ,Call box privée ,Accès au WorkZone Events ,Café',
      serviceId: serviceIds[2],
    },
  });
  let tarifCoWorkingZone3 = await prisma.tarif.create({
    data: {
      name: 'Full time ',
      duration: 'Month',
      capacity: 'per persone',
      price: 299,
      description:
        'Accès 24 hrs / 7 jrs , 2 sites de coworking, Salle de réunion a -40% ,Call box privée ,Accès au WorkZone Events ,Café',
      serviceId: serviceIds[2],
    },
  });

  let bookingTarifPrivateSpace1 = await prisma.booking.create({
    data: {
      date: new Date('01/05/2023'),
      startTime: '8',
      endTime: '10',
      userId: users[0].id,
      tarifId: tarifPrivateSpace1.id,
      freeSpace: 'hello',
    },
  });

  console.log(users);
  console.log(articles);

  let rating = [];
  for (let i = 0; i < articles.length; i += 2) {
    rating.push(
      await prisma.rating.create({
        data: {
          articleByBranchId:
            articlesByBranchIds[
              Math.floor(Math.random() * articlesByBranchIds.length)
            ],
          userId: users[Math.floor(Math.random() * users.length)].id,
          rate: Math.floor(Math.random() * 5),
          commit: '',
        },
      }),
    );
  }

  // create dummy blogs
  
  for (let i = 0; i < 50; i++) {
    const newBlog = await prisma.blog.create({
      data: {
        content: 'hello from the other side.',
        title: 'My Blog Post '+i,
        authorId: users[Math.floor(Math.random()*users.length)].id,
        categoryId: articleCategoryIds[Math.floor(Math.random()*articleCategoryIds.length)],
        confirm:i%2===0?true:false
      },
    });
    for(let i=0;i<Math.floor(Math.random()*10);i++){
      await prisma.view.create({
        data:{
          blogId:newBlog.id
        }
      })
    }
  }
  
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
