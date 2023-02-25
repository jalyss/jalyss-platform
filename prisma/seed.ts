import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    let posts = []
    // create 10 dummy users
    for (let i = 0; i < 10; i++) {
        posts.push(await prisma.user.create({
            data: {
                email: 'jaliss' + i + '@gmail.com',
                fullNameAr: `jalyss${i}`,
                fullNameEn: `jalyss${i}`,
                address: "sfax",
                tel: "123456789",
                password: "1234"
            }
        }))
    }


    console.log(posts)
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