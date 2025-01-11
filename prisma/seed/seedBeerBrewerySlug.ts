import { PrismaClient } from "@prisma/client";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

const prisma = new PrismaClient();

async function main() {
    const breweries = await prisma.brewery.findMany();
    const breweryLength = breweries.length;
    let count = 0;
    for (const brewery of breweries) {
        const slugBrewery = slugger.slug(brewery.name);
        await prisma.brewery.update({
            where: { id: brewery.id },
            data: {
                slug: slugBrewery
            }
        });
        count++;
        console.log(`${count} / ${breweryLength} - ${brewery.name}`);
    }
    const beers = await prisma.beer.findMany();
    const beerLength = beers.length;
    slugger.reset();
    count = 0;
    for (const beer of beers) {
        const slugBeer = slugger.slug(beer.name);
        await prisma.beer.update({
            where: { id: beer.id },
            data: {
                slug: slugBeer
            }
        });
        count++;
        console.log(`${count} / ${beerLength} - ${beer.name}`);
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
