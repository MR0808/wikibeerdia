import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const breweries = await prisma.brewery.findMany({
        include: { beers: true }
    });
    const breweryLength = breweries.length;
    let countBreweries = 1;
    let countBeers = 0;
    const precision = 100; // 2 decimals

    for (const brewery of breweries) {
        const randomnum = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
        const beerLength = brewery.beers.length
        await prisma.brewery.update({ where: { id: brewery.id }, data: { averageRating: randomnum.toString() } })

        for (const beer of brewery.beers) {
            const randomRating = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
            await prisma.beer.update({ where: { id: beer.id }, data: { averageRating: randomRating.toString() } })

            countBeers++;
            console.log(
                `Brewery Rating - ${randomnum} - Beer Rating - ${randomRating} - Brewery - ${countBreweries} / ${breweryLength} - Beer ${countBeers} / ${beerLength}`
            );
        }

        countBreweries++;
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
