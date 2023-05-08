import { PrismaClient } from '@prisma/client';
import { Domain, create } from 'domain';
import * as bcrypt from 'bcrypt';
import { domainToUnicode } from 'url';
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
        { "domain": "employee", "action": "read" },
        { "domain": "employee", "action": "create" },
        { "domain": "employee", "action": "update" },
        { "domain": "employee", "action": "delete" },
        { "domain": "blog", "action": "read" },
        { "domain": "blog", "action": "update" },
        { "domain": "blog", "action": "delete" },
      ],
    }
  })
  let itManagerRole = await prisma.role.create({
    data: {
      nameAr: 'مسؤول الاعلامية',
      nameEn: 'It Manager',
      permissions: [
        { "domain": "employee", "action": "read" },
        { "domain": "employee", "action": "create" },
        { "domain": "employee", "action": "update" },
        { "domain": "employee", "action": "delete" },
        { "domain": "blog", "action": "read" },
        { "domain": "blog", "action": "update" },
        { "domain": "blog", "action": "delete" },
      ],
    }
  })
  let hrManagerRole = await prisma.role.create({

    data: {
      nameAr: 'مسؤول الموارد البشرية',
      nameEn: 'HR Manager',
      permissions: [
        { "domain": "blog", "action": "read" },
        { "domain": "blog", "action": "update" },
        { "domain": "blog", "action": "delete" },
      ],
    }
  })
  let selesAgentRole = await prisma.role.create({

    data: {
      nameAr: 'رجل المبيعات',
      nameEn: 'Sales Agent',
      permissions: [
        { "domain": "blog", "action": "read" },
        { "domain": "blog", "action": "update" },
        { "domain": "blog", "action": "delete" },
      ],
    }
  })
  let groutAgentRole = await prisma.role.create({

    data: {
      nameAr: 'مسؤول التعليب',
      nameEn: 'Grout Agent',
      permissions: [
        { "domain": "blog", "action": "read" },
        { "domain": "blog", "action": "update" },
        { "domain": "blog", "action": "delete" },
      ],
    }
  })
  let developerRole = await prisma.role.create({

    data: {
      nameAr: 'مبرمج',
      nameEn: 'Developer',
      permissions: [
        { "domain": "blog", "action": "read" },
        { "domain": "blog", "action": "update" },
        { "domain": "blog", "action": "delete" },
      ],
    }
  })


  //create employees
  const saltEm = await bcrypt.genSalt();
  let manager = await prisma.employee.create({
    data: {
      fullNameAr: 'بسمة',
      fullNameEn: 'besma',
      email: 'besma@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      isAdmin: true,
      roleId: managerRole.id,
      branchId: branch.id

    }
  })
  let developer1 = await prisma.employee.create({
    data: {
      fullNameAr: 'وسيم',
      fullNameEn: 'wassim',
      email: 'wassim@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      roleId: developerRole.id,
      branchId: branch.id
    }
  })
  let developer2 = await prisma.employee.create({
    data: {
      fullNameAr: 'غادة',
      fullNameEn: 'ghada',
      email: 'ghada@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      roleId: developerRole.id,
      branchId: branch.id
    }
  })
  let itManager = await prisma.employee.create({
    data: {
      fullNameAr: 'خليل',
      fullNameEn: 'khalil',
      email: 'khalil@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      roleId: itManagerRole.id,
      branchId: branch.id
    }
  })

  let groutAgent = await prisma.employee.create({
    data: {
      fullNameAr: 'ناديه',
      fullNameEn: 'nedia',
      email: 'nedia@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      roleId: groutAgentRole.id,
      branchId: branch.id
    }
  })
  let sellesAgent = await prisma.employee.create({
    data: {
      fullNameAr: 'اماني',
      fullNameEn: 'ameni',
      email: 'ameni@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      roleId: selesAgentRole.id,
      branchId: branch.id
    }
  })
  let hrManager = await prisma.employee.create({
    data: {
      fullNameAr: 'ابتسام',
      fullNameEn: 'ibtisem',
      email: 'ibtisem@jalyss.com',
      address: '',
      tel: '',
      password: await bcrypt.hash('1234', saltEm),
      roleId: hrManagerRole.id,
      branchId: branch.id
    }
  })
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
      countryId: country1.id

    },

  });
  let city2 = await prisma.city.create({
    data: {
      nameAr: 'صفاقس',
      nameEn: 'Sfax',
      countryId: country1.id

    },

  });
  let countryIds = [country1.id, country2.id]
  let cityIds = [city1.id, city2.id]

  //create dummy author
  let author1 = await prisma.author.create({
    data: {
      nameAr: ' داير واين',
      nameEn: ' Wayne Dyer',
      biographyAr: ',',
      biographyEn: ','
    },
  });

  let author2 = await prisma.author.create({
    data: {
      nameAr: 'كوفي ستيفن',
      nameEn: ' Stephen Covey',
      biographyAr: ',',
      biographyEn: ','
    },
  });

  let author3 = await prisma.author.create({
    data: {
      nameAr: ' شوبرا ديباك',
      nameEn: ' Deepak Chopra',
      biographyAr: ',',
      biographyEn: ','
    },
  });
  let authorIds = [author1.id, author2.id, author3.id]


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
  let articleCategoryIds = [articleCategory1.id, articleCategory2.id, articleCategory3.id]
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
    data: {
      type: 'image',
      alt: 'cover test',
      extension: 'jpg',
      description: 'cover test',
      path: `https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg`
    }
  })
  for (let i = 0; i < 20; i++) {
    articles.push(
      await prisma.article.create({
        data: {
          title: 'jalyss book ' + i,
          coverId: cover.id,
          weight: 110,
          pageNumber: 255,
          code: `0000-${i}`,
          ArticleByAuthor: {
            create: {
              authorId: authorIds[Math.floor(Math.random() * authorIds.length)]
            }
          },
          categoryId: articleCategoryIds[Math.floor(Math.random() * articleCategoryIds.length)],
          typeId: type.id,
          publishingHouseId: publishinghouseIds[Math.floor(Math.random() * publishinghouseIds.length)],
        },
      }),
    );
  }

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
  await prisma.articlesByBranch.create({
    data: {
      branchId: mainBranch.id,
      articleId: articles[0].id,
      price: 125.25,
      stock: 10,
    },
  })

  //create dummy orders
let commands=[]
  for (let i = 0; i < 10; i++) {
    commands.push(
      await prisma.command.create({
        data: {
          clientName:'client'+i,
          clientAddress:'Lac 2 Tunis',
          clientTel:'22222222',
          clientEmail: 'client' + i + '@gmail.com',
          branchId:branch.id,
          countryId:countryIds[Math.floor(Math.random()*countryIds.length)],
          cityId:cityIds[Math.floor(Math.random()*cityIds.length)],
        
          
        },
      }),
    );
  }


  // create dummy services 
  let serviceIds = [];

  const serviceNames = ["Domicilation", "Private Space", "Meeting Space", "Co-Working Zone"];

  for (let i = 0; i < serviceNames.length; i++) {
    let service = await prisma.service.create({
      data: {
        name: serviceNames[i],

      }
    });

    serviceIds.push(service.id);
  }

  console.log(serviceIds);


  console.log(users);
  console.log(articles);
  console.log(articlesByBranch);
  let rating = [];
  for (let i = 0; i < articles.length; i += 2) {
    rating.push(
      await prisma.rating.create({
        data: {
          articleByBranchId: articlesByBranch[Math.floor(Math.random() * articlesByBranch.length)].id,
          userId: users[Math.floor(Math.random() * users.length)].id,
          rate: Math.floor(Math.random() * 5),
          commit: ''
        }
      })
    )
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
