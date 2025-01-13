import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const beers = await prisma.beer.findMany({ include: { images: true } });
    const beerLength = beers.length;
    let countBeers = 0;
    let countImage = 1


    for (const beer of beers) {
        countImage = 1
        for (const image of beer.images) {
            await prisma.beerImages.update({
                where: { id: image.id },
                data: {
                    order: countImage,
                }
            });
            console.log(`${countImage} / 3`)
            countImage++
        }
        countBeers++;
        console.log(`${countBeers} / ${beerLength}`)
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
