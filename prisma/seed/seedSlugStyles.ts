// import { PrismaClient } from "@prisma/client";
// import GithubSlugger from "github-slugger";

// const slugger = new GithubSlugger();

// const prisma = new PrismaClient();

// async function main() {
//     const subStyles = await prisma.subStyle.findMany();
//     subStyles.map((subStyle) => {
//         console.log(slugger.slug(subStyle.name));
//     });
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });
