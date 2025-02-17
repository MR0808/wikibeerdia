import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const beers = await prisma.beer.findMany();
    const beerLength = beers.length;
    let countBeers = 0;

    for (const beer of beers) {
        const precisionABV = 10; // 2 decimals
        let min = 10;
        let max = 100;
        const abv =
            Math.floor(
                Math.random() * (10 * precisionABV - 1 * precisionABV) +
                    1 * precisionABV
            ) /
            (1 * precisionABV);
        const ibu = Math.floor(Math.random() * (max - min + 1)) + min;

        const beerUpdated = await prisma.beer.update({
            where: { id: beer.id },
            data: {
                abv,
                ibu
            }
        });
        countBeers++;
        console.log(`Beer ${countBeers} / ${beerLength}`);
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
