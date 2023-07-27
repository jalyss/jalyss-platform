import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { chatSeed } from './seeds/chatSeed';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  let users = [];
  let articles = [];
  let usersIds = [];

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
  let mediasAvatarUser1 = await prisma.media.create({
    data: {
      path: 'https://p5.storage.canalblog.com/50/89/1228697/127715041.jpg',
      type: 'image',
      extension: 'jpg',
    },
  });

  let mediasAvatarUser2 = await prisma.media.create({
    data: {
      path: 'https://stylesatlife.com/wp-content/uploads/2022/12/Haircuts-for-School-Boys-11.jpg.webp',
      type: 'image',
      extension: 'jpg',
    },
  });

  let mediasAvatarUser3 = await prisma.media.create({
    data: {
      path: 'https://media.istockphoto.com/id/1351445167/photo/happy-male-youngster-smiling-at-the-camera-outdoors.jpg?b=1&s=170667a&w=0&k=20&c=iebfRFHi1ncG_CNCZLmOSLnRI_TO0D4rACMbarHsADc=',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser4 = await prisma.media.create({
    data: {
      path: 'https://media.istockphoto.com/id/1159801546/photo/portrait-of-handsome-boy-posing-in-photo-studio.jpg?s=612x612&w=0&k=20&c=YLyXwo6WaVWv8j80fLEyPjOmp3--6VlVYRU-Eyco5eQ=',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser5 = await prisma.media.create({
    data: {
      path: 'https://blog.hootsuite.com/wp-content/uploads/2020/02/Image-copyright-556x556.png',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser6 = await prisma.media.create({
    data: {
      path: 'https://pixlr.com/images/index/remove-bg.webp',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser7 = await prisma.media.create({
    data: {
      path: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/cut-out-an-image/thumbnail.jpeg',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser8 = await prisma.media.create({
    data: {
      path: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/cut-out-an-image/thumbnail.jpeg',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser9 = await prisma.media.create({
    data: {
      path: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/cut-out-an-image/thumbnail.jpeg',
      type: 'image',
      extension: 'jpg',
    },
  });
  let mediasAvatarUser10 = await prisma.media.create({
    data: {
      path: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/cut-out-an-image/thumbnail.jpeg',
      type: 'image',
      extension: 'jpg',
    },
  });

  let userMedia = [
    mediasAvatarUser1.id,
    mediasAvatarUser2.id,
    mediasAvatarUser3.id,
    mediasAvatarUser4.id,
    mediasAvatarUser5.id,
    mediasAvatarUser6.id,
    mediasAvatarUser7.id,
    mediasAvatarUser8.id,
    mediasAvatarUser9.id,
    mediasAvatarUser10.id,
  ];

  const salt = await bcrypt.genSalt();
  for (let i = 0; i < 10; i++) {
    let newClient = await prisma.client.create({
      data: {
        fullNameAr: `جليس ${i}`,
        fullNameEn: `jalyss${i}`,
        address: 'sfax',
        tel: '123456789',
        email: 'jalyss' + i + '@gmail.com',
      },
    });
    let newUser = await prisma.user.create({
      data: {
        email: newClient.email,
        fullNameAr: `جليس ${i}`,
        fullNameEn: `jalyss${i}`,
        password: await bcrypt.hash('1234', salt),
        avatarId: userMedia[i],
        clientId: newClient.id,
      },
    });

    usersIds.push(newUser.id);
    users.push(newUser);
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

      isAdmin: true,
      roleId: managerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee1.id,
    },
  });
  let managerUser = await prisma.user.create({
    data: {
      fullNameAr: 'بسمة',
      fullNameEn: 'besma',
      email: 'besma@jalyss.com',
      isClient: false,
      employeeId: manager.id,
      password: await bcrypt.hash('1234', saltEm),

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

      roleId: developerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee2.id,
    },
  });
  let developer1User = await prisma.user.create({
    data: {
      fullNameAr: 'وسيم',
      fullNameEn: 'wassim',
      email: 'wassim@jalyss.com',
      isClient: false,
      employeeId: developer1.id,
      password: await bcrypt.hash('1234', saltEm),

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

      roleId: developerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee3.id,
    },
  });
  let developer2User = await prisma.user.create({
    data: {
      fullNameAr: 'غادة',
      fullNameEn: 'ghada',
      email: 'ghada@jalyss.com',
      isClient: false,
      employeeId: developer2.id,
      password: await bcrypt.hash('1234', saltEm),

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
      roleId: itManagerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee4.id,
    },
  });
  let itManagerUser = await prisma.user.create({
    data: {
      fullNameAr: 'خليل',
      fullNameEn: 'khalil',
      email: 'khalil@jalyss.com',
      isClient: false,
      employeeId: itManager.id,
      password: await bcrypt.hash('1234', saltEm),

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

      roleId: groutAgentRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee5.id,
    },
  });
  let groutAgentUser = await prisma.user.create({
    data: {
      fullNameAr: 'ناديه',
      fullNameEn: 'nedia',
      email: 'nedia@jalyss.com',
      isClient: false,
      employeeId: groutAgent.id,
      password: await bcrypt.hash('1234', saltEm),

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

      roleId: selesAgentRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee6.id,
    },
  });
  let sellesAgentUser = await prisma.user.create({
    data: {
      fullNameAr: 'اماني',
      fullNameEn: 'ameni',
      email: 'ameni@jalyss.com',
      isClient: false,
      employeeId: sellesAgent.id,
      password: await bcrypt.hash('1234', saltEm),

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
      roleId: hrManagerRole.id,
      branchId: branch.id,
      avatarId: mediasAvatarEmployee7.id,
    },
  });
  let hrManagerUser = await prisma.user.create({
    data: {
      fullNameAr: 'ابتسام',
      fullNameEn: 'ibtisem',
      email: 'ibtisem@jalyss.com',
      isClient: false,
      employeeId: hrManager.id,
      password: await bcrypt.hash('1234', saltEm),
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

  // create logo id
  let medialogoforPublishHouse = await prisma.media.create({
    data: {
      path: 'https://p5.storage.canalblog.com/50/89/1228697/127715041.jpg',
      type: 'image',
      extension: 'jpg',
    },
  });

  //create dummy publishing House
  let publishingHouse1 = await prisma.publishingHouse.create({
    data: {
      name: 'جرير',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse2 = await prisma.publishingHouse.create({
    data: {
      name: 'جبل عمان',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse3 = await prisma.publishingHouse.create({
    data: {
      name: 'ملهمون',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse4 = await prisma.publishingHouse.create({
    data: {
      name: 'دار الشروق',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse5 = await prisma.publishingHouse.create({
    data: {
      name: 'دار الكتاب العربي',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse6 = await prisma.publishingHouse.create({
    data: {
      name: 'دار الفراشة',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse7 = await prisma.publishingHouse.create({
    data: {
      name: 'دار المعارف',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
    },
  });
  let publishingHouse8 = await prisma.publishingHouse.create({
    data: {
      name: ' دار الآداب',
      address: 'Saudi arabic',
      logoId: medialogoforPublishHouse.id,
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
  let serviceIds: string[] = [];

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
        perHour: i !== 2 ? true : false,
        name: serviceNames[i],
        identifier: serviceNames[i].replace(' ', '-').toLowerCase(),
      },
    });

    serviceIds.push(service.id);
  }

  console.log(serviceIds);
  let coverWorkSpace = await prisma.media.create({
    data: {
      alt: 'bureau Sfax',
      extension: 'jpg',
      type: 'image',
      path: 'https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png',
    },
  });
  let workSpacePrivateSpace = await prisma.workSpace.create({
    data: {
      serviceId: serviceIds[0],
      name: 'bureau sfax',
      // imageId: coverWorkSpace.id,
    },
  });
  let workSpaceMeetingSpace = await prisma.workSpace.create({
    data: {
      name: 'salle de reunion sfax',
      // imageId: coverWorkSpace.id,
      serviceId: serviceIds[1],
    },
  });

  let workSpaceCoworkingSpace = await prisma.workSpace.create({
    data: {
      name: 'open space sfax',
      // imageId: coverWorkSpace.id,
      serviceId: serviceIds[2],
    },
  });
  let tarifPrivateSpace33 = await prisma.tarif.create({
    data: {
      duration: 'trimestre(299DT)',
      price: 299,
      description: 'aaaaaaaaaa',
      serviceId: serviceIds[0],
      pricePerDay: 5,
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
      description: 'salle de reunion  sfax ',
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
      pricePerDay: 5.5,
      description: 'Optical fiber, Video Projector, White board',
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

  let data = [
    "Understanding React's component-based architecture",
    'Working with JSX syntax',
    'Managing state and props',
    'Handling events in React',
  ];
  let whatYouWillLearnIds = [];
  for (let i = 0; i < data.length; i++) {
    const whatYouWillLearn = await prisma.whatYouWillLearn.create({
      data: {
        content: data[i],
      },
    });
    whatYouWillLearnIds.push(whatYouWillLearn.id);
  }

  // create session type
  let sessionTypeIds = [];
  let titles = ['online', 'surSite'];
  for (let i = 0; i < 2; i++) {
    let sessionType = await prisma.sessionType.create({
      data: {
        title: titles[Math.floor(Math.random() * titles.length)],
      },
    });

    sessionTypeIds.push(sessionType.id);
  }

  // create cover session
  // let mediaSessionIds = [];

  // for (let i = 0; i < 10; i++) {
  //   let media = await prisma.media.create({
  //     data: {
  //       alt: 'image',
  //       description: 'image',
  //       path: 'https://i.pravatar.cc/',
  //       extension: 'jpg',
  //       type: 'image',
  //     },
  //   });

  //   mediaSessionIds.push(media.id);
  // }

  for (let i = 0; i < 50; i++) {
    const newBlog = await prisma.blog.create({
      data: {
        content: 'hello from the other side.',
        title: 'My Blog Post ' + i,
        authorId: users[Math.floor(Math.random() * users.length)].id,
        categoryId:
          articleCategoryIds[
            Math.floor(Math.random() * articleCategoryIds.length)
          ],
      },
    });
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      await prisma.view.create({
        data: {
          blogId: newBlog.id,
        },
      });
    }
  }
  //create session
  let lectures = [];
  let sessions = [];
  let sHL = [];
  let sessionIds = [];
  let shT = [];
  let shW = [];
  let lhw = [];
  let sHp = []; // session has prerequire elements
  let sessionTarifIds = [];
  let featuresIds = [];

  const search = (s, l) => {
    return (
      sHL.filter((e) => e.sessionId === s && e.lectureId === l).length === 0
    );
  };
  const search2 = (s, l) => {
    return (
      shT.filter((e) => e.sessionId === s && e.sessionTypeId === l).length === 0
    );
  };

  const search3 = (s, l) => {
    return (
      shW.filter((e) => e.sessionId === s && e.WhatYouWillLearnId === l)
        .length === 0
    );
  };
  const search4 = (s, l) => {
    return (
      lhw.filter((e) => e.lectureId === s && e.WhatYouWillLearnId === l)
        .length === 0
    );
  };

  const search5 = (s, l) => {
    return (
      sHp.filter((e) => e.sessionId === s && e.prerequireId === l).length === 0
    );
  };

  let MediaSessionIds = [];
  let pathMedia = [
    'https://www.enicbcmed.eu/sites/default/files/2021-11/Formation.jpg',
    'https://www.lecoindesentrepreneurs.fr/wp-content/uploads/2020/01/cr%C3%A9er-une-soci%C3%A9t%C3%A9-de-formation.png',
    'https://thumbs.dreamstime.com/b/food-eating-family-concept-group-people-having-breakfast-sitting-table-group-people-having-breakfast-table-113083220.jpg',
    'https://www.cidj.com/sites/default/files/2021-11/l-offre-de-formation-2022-du-cidj_3.png',
    'https://www.benin.campusfrance.org/sites/pays/files/benin/styles/mobile_visuel_principal_page/public/formations%20pro.jpg?itok=Fb6u0xbO',
    'https://cdn-images.welcometothejungle.com/zINI7olZXBRIpTx42POLq5xIR9j8eXQNky5wKFSQCVU/rs:auto:980::/q:85/czM6Ly93dHRqLXByb2R1Y3Rpb24vdXBsb2Fkcy9hcnRpY2xlL2ltYWdlLzM2NzMvMTUxOTc0L2Zvcm1hdGlvbnMtbW9kZS1lbXBsb2kuanBn',
    'https://prium-formation.com/wp-content/uploads/2021/10/Creer-un-organisme-de-formation.jpg',
    'https://www.digiformag.com/wp-content/uploads/2018/02/creation-of.jpg.webp',
    'https://www.campusfrance.org/sites/default/files/trouver%20sa%20formation%20%28mise%20en%20avant%29.jpg',
    'https://nell-associes.com/wp-content/uploads/esprit-dequipe.webp',
    'https://www.beaboss.fr/Assets/Img/BREVE/2016/6/306037/Travailler-esprit-equipe-start--F.jpg',
    'https://evolutis-formation.fr/wp-content/uploads/2018/03/ce742d950ca63a98d59ecec5eba0da2e_XL.jpg',
    'https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/03/6elementsessentiels.jpg',
  ];
  for (let i = 0; i < 6; i++) {
    let media = await prisma.media.create({
      data: {
        path: pathMedia[Math.floor(Math.random() * pathMedia.length)],
        extension: 'jpg',
        type: 'image',
      },
    });

    MediaSessionIds.push(media.id);
  }
  let mediaSessionCoverIds = [];

  //  let trainingBookingIds=[]

  //   for (let i = 0; i < 3; i++) {
  //     let trainingBooking = await prisma.trainingBooking.create({
  //       data: {
  //      userId: users[Math.floor(Math.random() * users.length)].id,
  //      sessiontarif:{create}
  //       },
  //     });

  let pathMedia2 = [
    'https://cdn.explara.com/tempuploads/interactive-business-mentoring-session-820210706121141.jpg',
    'https://www.district32.com.au/wp-content/uploads/2023/03/Business-Mentoring.png',
    'https://static.wixstatic.com/media/316e68_3f56dee9bdb54f23ba7dcd3bbd885105~mv2.png/v1/fill/w_438,h_620,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Mentorship_Mentor.png',
    'https://www.process.st/wp-content/uploads/2022/05/Benefits-of-mentoring-new-employees6-1024x1024.png',
    'https://media.licdn.com/dms/image/C5622AQEl4Ai6P5OOsg/feedshare-shrink_800/0/1673415000723?e=1690416000&v=beta&t=PEKjsJZY4OGfc0EtGXRCEbi0fGiJisMStYkedS3KmW4',
    'https://s4769.pcdn.co/wp-content/uploads/2020/03/Roundtable_mt_v3_MentoringWorkplace-scaled.jpg',
    'https://lh5.googleusercontent.com/LECgNkEUM257nb9KLx6GEFCupRZCnvl424v6ZUnO8REGaXp350Y0pEHUJFMSorbhzSYw4cWwcpQSka4PfkAMkNvcgEHPs9LtbUM2dtDmSs1Oijx107ItummU5E8QVmBLI7bWd0zm',
    'https://miro.medium.com/v2/resize:fit:1200/1*gaq5hWubLxmyylgTC8WqRw.jpeg',
    'https://odgers-prod-neu-cdn-tm-endpoint.azureedge.net/media/10904/odgers-berndtson-eye-on-the-c-suite-series-hero.png?anchor=center&mode=crop&width=335&height=289&rnd=132767937190000000',
    'https://fs.hubspotusercontent00.net/hubfs/41809/social-suggested-images/engagedly.comwp-contentuploads20180910-Things-To-Look-For-In-A-Goal-Setting-Software-Nov-18-2021-02-52-40-07-PM.jpg',
    'https://leadershipmanagement.com.au/wp-content/uploads/2016/11/Following-the-Leaders_LEAD-Whitepaper-Nov-16-Thumbnail.png',
    'https://ospe.on.ca/wp-content/uploads/2019/04/Mentorship-2.jpg',
    'https://sidecarglobal.com/wp-content/uploads/2021/11/Everything-You-Need-to-Know-About-Being-a-Mentor-e1637009976672.png',
    'https://www.bulcode.com/assets/img/blog/mentorship_program/blog_mentorship_program.jpg',
    'https://www.sreb.org/sites/main/files/imagecache/thumbnail/main-images/2022_publication_cover.png?1666788264',
    'https://media.licdn.com/dms/image/C5612AQGsYnJAD56WxA/article-cover_image-shrink_600_2000/0/1580266364378?e=2147483647&v=beta&t=uwk6-vDPqvl7LUHtuZo6AvjQnbPnkOvQAML08zrmQUA',
    'https://minutes.co/wp-content/uploads/2022/03/shutterstock_1851240808-1000x600.jpg',
  ];

  for (let i = 0; i < 10; i++) {
    let media = await prisma.media.create({
      data: {
        alt: 'image',
        description: 'image',
        path: pathMedia2[Math.floor(Math.random() * pathMedia2.length)],
        extension: 'jpg',
        type: 'image',
      },
    });

    mediaSessionCoverIds.push(media.id);
  }

  for (let i = 0; i < 50; i++) {
    const lecture = await prisma.lecture.create({
      data: {
        title: 'My Lecture ' + i,
        content: 'Hello, this is a new lecture'
      },
    });
    lectures.push(lecture);

    let l = lecture.id;
    let l2 =
      whatYouWillLearnIds[
        Math.floor(Math.random() * whatYouWillLearnIds.length)
      ];
    if (search4(l, l2)) {
      shT.push(
        await prisma.lectureHasWhatYouWillLearn.create({
          data: {
            lectureId: l,
            WhatYouWillLearnId: l2,
          },
        }),
      );
    }

    const session = await prisma.session.create({
      data: {
        MediaSession: {
          create: MediaSessionIds.map((mediaId) => ({ mediaId })),
        },
        title: 'My Session Post ' + i,
        description: 'Hello, this is a new session',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-02-02'),
        categoryId:
          articleCategoryIds[
            Math.floor(Math.random() * articleCategoryIds.length)
          ],
        coverId:
          mediaSessionCoverIds[
            Math.floor(Math.random() * mediaSessionCoverIds.length)
          ],
      },
    });
    sessions.push(session);
    sessionIds.push(session.id);

    if (sessionIds.length && sessionTypeIds.length) {
      let l = sessionIds[Math.floor(Math.random() * sessionIds.length)];
      let l2 =
        sessionTypeIds[Math.floor(Math.random() * sessionTypeIds.length)];
      if (search2(l, l2)) {
        shT.push(
          await prisma.sessionHasSessionType.create({
            data: {
              sessionId: l,
              sessionTypeId: l2,
            },
          }),
        );
      }
      let q = sessionIds[Math.floor(Math.random() * sessionIds.length)];
      let q2 =
        whatYouWillLearnIds[
          Math.floor(Math.random() * whatYouWillLearnIds.length)
        ];
      if (search3(q, q2)) {
        shW.push(
          await prisma.sessionHasWhatYouWillLearn.create({
            data: {
              sessionId: q,
              WhatYouWillLearnId: q2,
            },
          }),
        );
      }
    }

    const titleST = ['Basic', 'Pro', 'Companies'];
    const priceST = [20, 50, 90];
    const sessionTarif = await prisma.sessionTarif.create({
      data: {
        title: titleST[Math.floor(Math.random() * titleST.length)],
        price: priceST[Math.floor(Math.random() * priceST.length)],
        sessionId: sessionIds[Math.floor(Math.random() * sessionIds.length)],
        bookings: { create: usersIds.map((userId) => ({ userId })) },
      },
    });
    sessionTarifIds.push(sessionTarif.id);

    let feedBack = [
      'The session provided a matter. The content was well-organized and easy to follow. I particularly enjoyed the hands-on exercises that helped solidify my understanding!',
      'I found the session to be extremely helpful in bridging my knowledge gap.',
      'Attending this session was a game-changer for me. The instructors expertise and teaching style were outstanding. I appreciated the interactive approach,',
      'I highly recommend this session to anyone interested in the topic. The content was delivered in a clear and concise manner!',
      'The session was truly eye-opening. The instructors passion and expertise were evident throughout.',
    ];
    let sessionFeedback = await prisma.sessionFeedback.create({
      data: {
        content: feedBack[Math.floor(Math.random() * feedBack.length)],
        sessionId: session.id,
        userId: users[Math.floor(Math.random() * users.length)].id,
      },
    });

    let preRequireIds = [];
    let prerequis = [
      'front-end skills',
      'back-end',
      'challenger',
      'SQL experience',
      'pythons killer',
      'Get up and move',
      'Get enough sleep',
      'eat the rigth food',
      'find other steams of income',
      'track expenses',
      'live in harmony',
    ];

    let sessionPrerequis = await prisma.prerequire.create({
      data: {
        content: prerequis[Math.floor(Math.random() * prerequis.length)],
      },
    });
    preRequireIds.push(sessionPrerequis.id);

    let w = sessionIds[Math.floor(Math.random() * sessionIds.length)];
    let w2 = preRequireIds[Math.floor(Math.random() * preRequireIds.length)];
    if (search5(w, w2)) {
      sHp.push(
        await prisma.sessionHasPrerequire.create({
          data: {
            sessionId: w,
            prerequireId: w2,
          },
        }),
      );
    }

    const newCoach = await prisma.coaching.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        lectureId: lectures[Math.floor(Math.random() * lectures.length)].id,
      },
    });
    if (lectures.length && sessions.length) {
      let lectId = lectures[Math.floor(Math.random() * lectures.length)].id;
      let sesId = sessions[Math.floor(Math.random() * sessions.length)].id;

      if (search(sesId, lectId)) {
        sHL.push(
          await prisma.sessionHasLecture.create({
            data: { sessionId: sesId, lectureId: lectId,startAt: new Date().toISOString(),endAt:new Date().toISOString() },
          }),
        );
      }
    }
  }

  for (let i = 0; i < sessionIds.length; i++) {
    const sessionUpdate = await prisma.session.update({
      where: {
        id: sessionIds[i],
      },
      data: {
        previousSessionId:
          sessionIds[Math.floor(Math.random() * sessionIds.length)],
        nextSessionId:
          sessionIds[Math.floor(Math.random() * sessionIds.length)],
      },
    });
  }

  // create dummy FrequenclyAsked
  let questions = [
    'How to Enroll This Online Courses?',
    'Where It is hidden by default, until the collapse?',
    'Where It is hidden by default, until the collapse?',
    'How to Enline Courses?',
    'Wherefault, until the collapse?',
    'How It is hidden by default, until the collapse?',
  ];
  let answer = [
    'Choose a course: Start by identifying the online course you want to enroll in. Consider factors such as the subject, duration, cost, and the reputation of the course provider.',
    'Research the course provider: Look for reviews or information about the institution or platform offering the course. Ensure that it is a legitimate and reputable source of online education',
    'Visit the course website: Go to the website of the course provider to gather more details about the course. Look for information regarding enrollment, prerequisites, course content, and any specific requirements',
    'Review the course requirements: Check if there are any prerequisites or specific requirements for enrolling in the course. Ensure that you meet these requirements or are willing to fulfill them before proceeding',
    'Create an account: Many online course platforms require you to create an account before you can enroll. Look for a "Sign Up" or "Create an Account" option on the website and provide the necessary information to register',
    'Create an account: Many online course platforms require you to create an account before you can enroll. Look for a Sign Up or "Create an Account" option on the website and provide the necessary information to register',
  ];
  for (let i = 0; i < 6; i++) {
    let Freq = await prisma.frequentilyQuestion.create({
      data: {
        question: questions[i],
        answer: answer[i],
      },
    });
  }

  // create feedbacks

  const label = [
    '5 online courses gratuit',
    'free Book',
    'Certificates of Participation',
    'Access to Premium or VIP Content',
    'Gift Cards or Vouchers',
    'Exclusive Content or Resources',
    'Discounts or Coupons',
  ];

  for (let i = 0; i < 7; i++) {
    const features = await prisma.feature.create({
      data: {
        label: label[i],
      },
    });
    featuresIds.push(features.id);
  }
  chatSeed(prisma, usersIds);
  console.log(users);
  console.log(articles);
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
