import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prismaRandom from "prisma-extension-random";
import { LoremIpsum } from "lorem-ipsum";
import { ImagesUpload } from "../../types/global";
import { newImages } from "./images";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const prisma = new PrismaClient().$extends(prismaRandom());

async function main() {
    const breweries = await prisma.brewery.findMany({
        include: { beers: true }
    });
    const breweryLength = breweries.length;
    let countBreweries = 1;
    let countBeers = 0;
    const users = await prisma.user.findMany({
        select: { id: true }
    });
    const styles = await prisma.style.findMany();

    for (const brewery of breweries) {
        if (brewery.beers.length === 0) {
            const i = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
            countBeers = 0;
            for (let b = 0; b < i; b++) {
                const user = users[Math.floor(Math.random() * users.length)];
                const style = styles[Math.floor(Math.random() * styles.length)];
                const precisionABV = 10; // 2 decimals
                let min = 10;
                let max = 100;
                const x = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
                const name = faker.lorem.words({ min: 1, max: 3 });
                const description = faker.lorem.paragraphs({ min: 2, max: 5 });
                const abv = (
                    Math.floor(
                        Math.random() * (10 * precisionABV - 1 * precisionABV) +
                        1 * precisionABV
                    ) /
                    (1 * precisionABV)
                ).toString();
                const ibu = (
                    Math.floor(Math.random() * (max - min + 1)) + min
                ).toString();
                const yearCreated = Math.floor(
                    Math.random() * (2025 - 1980) + 1980
                );
                const available = faker.datatype.boolean();
                const headline = faker.lorem.sentence({ min: 5, max: 10 });
                const styleId =
                    style?.id || "5ca0856e-307f-4313-a8c5-c52ff6b47530";
                const userId = user?.id || "cm1q68hds0000146zv7kkvnnu";
                const images: ImagesUpload[] = [];
                for (let j = 0; j < x; j++) {
                    const imageUrl = newImages[j].imageUrl;
                    images.push({ image: imageUrl, order: j });
                }
                let slug = slugger.slug(name);
                let slugExists = true;

                while (slugExists) {
                    const checkSlug = await prisma.beer.findUnique({
                        where: { slug }
                    });
                    if (!checkSlug) {
                        slugExists = false;
                        break;
                    } else {
                        slug = slugger.slug(name);
                    }
                }
                const beer = await prisma.beer.create({
                    data: {
                        name,
                        description,
                        slug,
                        abv,
                        ibu,
                        yearCreated,
                        available,
                        headline,
                        styleId,
                        userId,
                        status: "APPROVED",
                        breweryId: brewery.id,
                        averageRating: '0'
                    }
                });
                for (const image of images) {
                    await prisma.beerImages.create({
                        data: {
                            order: image.order,
                            image: image.image,
                            beerId: beer.id
                        }
                    });
                }
                const reviewCount =
                    Math.floor(Math.random() * (150 - 50 + 1)) + 50;
                const userReview = await prisma.user.findManyRandom(
                    reviewCount,
                    {
                        select: { id: true }
                    }
                );
                for (let r = 0; r < reviewCount; r++) {
                    const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
                    const review = await prisma.beerReview.create({
                        data: {
                            comment: lorem.generateParagraphs(1),
                            rating,
                            status: "APPROVED",
                            beerId: beer.id,
                            userId: userReview[r].id
                        }
                    });
                    console.log(review.rating);
                }
                countBeers++;
                console.log(
                    `Brewery - ${countBreweries} / ${breweryLength} - Beer ${countBeers} / ${i}`
                );
            }
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
