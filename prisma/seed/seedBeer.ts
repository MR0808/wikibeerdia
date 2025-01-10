import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { uploadImage } from "../../utils/supabase";
import prismaRandom from "prisma-extension-random";
import { ImagesUpload } from "../../types/global";
import { LoremIpsum } from "lorem-ipsum";

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

const getUrlExtension = (url: string) => {
    return url.split(/[#?]/)[0].split(".").pop()?.trim();
};

const onImageEdit = async (imgUrl: string) => {
    var imgExt = getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "profileImage." + imgExt, {
        type: blob.type
    });

    return file;
};

async function main() {
    const breweries = await prisma.brewery.findMany({
        include: { beers: true }
    });
    for (const brewery of breweries) {
        if (brewery.beers.length === 0) {
            const i = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

            for (let b = 0; b < 3; b++) {
                const user = await prisma.user.findRandom({
                    select: { id: true }
                });
                const subStyle = await prisma.subStyle.findRandom();
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
                const subStyleId =
                    subStyle?.id || "045e8676-a426-4b64-bb4e-5cc669e0e3c1";
                const userId = user?.id || "cm1q68hds0000146zv7kkvnnu";
                const images: ImagesUpload[] = [];
                for (let j = 0; j < 2; j++) {
                    const image = await onImageEdit(
                        faker.image.urlPicsumPhotos()
                    );
                    const imageUrl = await uploadImage(image, "images-bucket");
                    images.push({ image: imageUrl, order: j });
                }
                const beer = await prisma.beer.create({
                    data: {
                        name,
                        description,
                        abv,
                        ibu,
                        yearCreated,
                        available,
                        headline,
                        subStyleId,
                        userId,
                        status: "APPROVED",
                        breweryId: brewery.id
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
                    console.log(r, review.rating);
                }
                console.log(name);
            }
        }
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
