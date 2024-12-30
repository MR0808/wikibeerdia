import { PrismaClient } from "@prisma/client";
import { LoremIpsum } from "lorem-ipsum";

const prisma = new PrismaClient();

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
    for (let i = 0; i < 500; i++) {
        const review = await prisma.breweryReview.create({
            data: {
                comment: lorem.generateParagraphs(1),
                rating: 5,
                status: "APPROVED",
                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
        console.log(i, review.rating);
    }
    for (let i = 0; i < 450; i++) {
        const review = await prisma.breweryReview.create({
            data: {
                comment: lorem.generateParagraphs(1),
                rating: 4,
                status: "APPROVED",
                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
        console.log(i, review.rating);
    }
    for (let i = 0; i < 200; i++) {
        const review = await prisma.breweryReview.create({
            data: {
                comment: lorem.generateParagraphs(1),
                rating: 3,
                status: "APPROVED",
                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
        console.log(i, review.rating);
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
