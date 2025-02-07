import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const breweries = await prisma.brewery.findMany({
        include: { _count: { select: { beers: true } } }
    });
    const breweryLength = breweries.length;
    let countBreweries = 0;

    for (const brewery of breweries) {
        await prisma.brewery.update({
            where: { id: brewery.id },
            data: { beerCount: brewery._count.beers }
        });
        countBreweries++;
        console.log(`${countBreweries} / ${breweryLength}`);
    }
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
