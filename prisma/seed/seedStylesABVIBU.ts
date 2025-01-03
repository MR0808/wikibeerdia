import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const styles = await prisma.subStyle.findMany();

    const precisionABV = 10; // 2 decimals
    let min = 10;
    let max = 100;
    for (const style of styles) {
        const abv = [
            Math.floor(
                Math.random() * (10 * precisionABV - 1 * precisionABV) +
                    1 * precisionABV
            ) /
                (1 * precisionABV),
            Math.floor(
                Math.random() * (10 * precisionABV - 1 * precisionABV) +
                    1 * precisionABV
            ) /
                (1 * precisionABV)
        ];
        const ibu = [
            Math.floor(Math.random() * (max - min + 1)) + min,
            Math.floor(Math.random() * (max - min + 1)) + min
        ];
        const abvLow = Math.min(...abv).toString();
        const abvHigh = Math.max(...abv).toString();
        const ibuLow = Math.min(...ibu).toString();
        const ibuHigh = Math.max(...ibu).toString();
        await prisma.subStyle.update({
            where: { id: style.id },
            data: {
                abvHigh,
                abvLow,
                ibuHigh,
                ibuLow
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
