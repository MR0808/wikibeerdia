import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const breweries = await prisma.brewery.findMany({
        select: {
            _count: {
                select: { beers: true }
            }
        }
    });
    let count = 0;
    for (const brewery of breweries) {
        brewery._count.beers === 0 && count++;
    }
    console.log(count);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
