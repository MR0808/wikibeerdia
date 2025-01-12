import { PrismaClient } from "@prisma/client";

import { beerImages } from "./beerImages";

const prisma = new PrismaClient();

async function main() {
    const beers = await prisma.beer.findMany({ include: { images: true } });
    const beerLength = beers.length;
    let countBeers = 0;
    let countImage = 0


    for (const beer of beers) {
        if (beer.images.length === 0) {
            for (let b = 0; b < 3; b++) {
                const image = `https://ijtvuxdbxfqssvyrwmla.supabase.co/storage/v1/object/public/images-bucket/${beerImages[countImage].name}`
                await prisma.beerImages.create({
                    data: {
                        order: 1,
                        image,
                        beerId: beer.id
                    }
                });
                console.log(`${b + 1} / 3`)
                countImage++
            }
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
