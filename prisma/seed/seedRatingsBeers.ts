import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const beers = await prisma.beer.findMany();
    const beerLength = beers.length;
    let countBeers = 1;
    const precision = 100; // 2 decimals

    for (const beer of beers) {
        const randomnum =
            Math.floor(
                Math.random() * (5 * precision - 1 * precision) + 1 * precision
            ) /
            (1 * precision);
        await prisma.beer.update({
            where: { id: beer.id },
            data: { averageRating: randomnum }
        });

        console.log(
            `Beer Rating - ${randomnum} - Beer - ${countBeers} / ${beerLength}`
        );

        countBeers++;
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
