import { PrismaClient } from "@prisma/client";
import { newStyles } from "./NewStyles";

import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

const prisma = new PrismaClient();

async function main() {
    let parentStyleName = "";
    let parentStyleId = "";
    let count = 0;
    const stylesLength = newStyles.length;
    for (const newStyle of newStyles) {
        console.log(count);
        if (newStyle.ParentStyle !== parentStyleName) {
            const parentStyle = await prisma.parentStyle.findFirst({
                where: { name: newStyle.ParentStyle }
            });
            if (parentStyle) {
                parentStyleId = parentStyle?.id;
            } else {
                const newParentStyle = await prisma.parentStyle.create({
                    data: {
                        name: newStyle.ParentStyle,
                        slug: slugger.slug(newStyle.ParentStyle),
                        status: "APPROVED",
                        userId: "cm1q68hds0000146zv7kkvnnu"
                    }
                });
                parentStyleId = newParentStyle.id;
            }
            parentStyleName = newStyle.ParentStyle;
        }
        const region = newStyle.Region.split(",");
        const styleDb = await prisma.style.create({
            data: {
                name: newStyle.Style,
                status: "APPROVED",
                userId: "cm1q68hds0000146zv7kkvnnu",
                parentStyleId: parentStyleId,
                description: newStyle.Description,
                slug: slugger.slug(newStyle.Style),
                abvHigh: newStyle.ABVHigh.toString(),
                abvLow: newStyle.ABVLow.toString(),
                ibuHigh: newStyle.IBUHigh.toString(),
                ibuLow: newStyle.IBULow.toString(),
                region
            }
        });
        count++;
        console.log(`${count} / ${stylesLength} - ${newStyle.Style}`);
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
