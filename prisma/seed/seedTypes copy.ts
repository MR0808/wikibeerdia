import { faker } from "@faker-js/faker";
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const statuses = [
        Status.DRAFT,
        Status.PENDING,
        Status.APPROVED,
        Status.DISABLED,
        Status.REJECTED
    ];

    for (let i = 0; i < 200; i++) {
        await prisma.breweryType.create({
            data: {
                name: faker.lorem.word(),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
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
