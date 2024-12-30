import { PrismaClient } from "@prisma/client";
import { styles } from "./styles";

const prisma = new PrismaClient();

async function main() {
    for (const parent of styles) {
        const parentStyle = await prisma.parentStyle.create({
            data: {
                name: parent.name,
                status: "APPROVED",
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
        console.log(parentStyle.id, parentStyle.name);

        for (const style of parent.style) {
            const styleDb = await prisma.style.create({
                data: {
                    name: style.name,
                    status: "APPROVED",
                    userId: "cm1q68hds0000146zv7kkvnnu",
                    parentStyleId: parentStyle.id
                }
            });
            console.log(styleDb.id, styleDb.name);

            for (const subStyle of style.subStyle!) {
                const subStyleDb = await prisma.subStyle.create({
                    data: {
                        name: subStyle.name,
                        status: "APPROVED",
                        userId: "cm1q68hds0000146zv7kkvnnu",
                        styleId: styleDb.id
                    }
                });
                console.log(subStyleDb.id, subStyleDb.name);
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
