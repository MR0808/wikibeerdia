import { PrismaClient } from "@prisma/client";
import { types } from "./types";

const prisma = new PrismaClient();

async function main() {
    for (const type of types.type) {
        const typeDb = await prisma.breweryType.create({
            data: {
                name: type.name,
                status: "APPROVED",
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
        console.log(typeDb.id, typeDb.name);
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
