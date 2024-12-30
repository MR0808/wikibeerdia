import { PrismaClient } from "@prisma/client";
import { newStyles } from "./newStyles";

const prisma = new PrismaClient();

async function main() {
    let parentStyleName = "";
    let parentStyleId = "";
    let styleName = "";
    let styleId = "";
    let count = 0;
    for (const newStyle of newStyles) {
        console.log(count);
        if (newStyle.parentStyle !== parentStyleName) {
            const parentStyle = await prisma.parentStyle.findFirst({
                where: { name: newStyle.parentStyle }
            });
            if (parentStyle) {
                parentStyleId = parentStyle?.id;
            } else {
                const newParentStyle = await prisma.parentStyle.create({
                    data: {
                        name: newStyle.parentStyle,
                        status: "APPROVED",
                        userId: "cm1q68hds0000146zv7kkvnnu"
                    }
                });
                parentStyleId = newParentStyle.id;
            }
            parentStyleName = newStyle.parentStyle;
        }
        if (newStyle.style !== styleName) {
            const style = await prisma.style.findFirst({
                where: { name: newStyle.parentStyle }
            });
            if (style) {
                styleId = style?.id;
            } else {
                const newBeerStyle = await prisma.style.create({
                    data: {
                        name: newStyle.style,
                        status: "APPROVED",
                        userId: "cm1q68hds0000146zv7kkvnnu",
                        parentStyleId: parentStyleId
                    }
                });
                styleId = newBeerStyle.id;
            }
            styleName = newStyle.style;
        }
        const subStyleDb = await prisma.subStyle.create({
            data: {
                name: newStyle.subStyle,
                status: "APPROVED",
                userId: "cm1q68hds0000146zv7kkvnnu",
                styleId: styleId,
                description: newStyle.description
            }
        });
        count++;
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
