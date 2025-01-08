import { PrismaClient } from "@prisma/client";
import { LoremIpsum } from "lorem-ipsum";
import prismaRandom from "prisma-extension-random";

const prisma = new PrismaClient().$extends(prismaRandom());

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

const ratings = [1, 2, 3, 4, 5];

async function main() {
    await prisma.brewery.updateMany({ data: { status: "APPROVED" } });

    const breweries = await prisma.brewery.findMany();
    for (const brewery of breweries) {
        const x = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
        const user = await prisma.user.findManyRandom(x, {
            select: { id: true }
        });
        for (let j = 0; j < x; j++) {
            const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            const review = await prisma.breweryReview.create({
                data: {
                    comment: lorem.generateParagraphs(1),
                    rating,
                    status: "APPROVED",
                    breweryId: brewery.id,
                    userId: user[j].id
                }
            });
            console.log(j, review.rating);
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
