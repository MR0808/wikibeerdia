import { PrismaClient } from "@prisma/client";

import { uploadImage } from "../utils/supabase";

const prisma = new PrismaClient();

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
    for (let i = 0; i < 11; i++) {
        const beer = await prisma.beer.create({
            data: {
                name: "Mark's Beer",
                status: "APPROVED",
                description:
                    "Trust fund deep v bicycle rights kombucha edison bulb shoreditch chillwave adaptogen jean shorts JOMO squid flannel freegan Brooklyn literally. Lomo subway tile coloring book woke vice franzen cliche post-ironic tattooed. Schlitz keytar vaporware artisan, four dollar toast cupping gentrify viral +1 celiac 90's marxism narwhal disrupt. Butcher godard knausgaard lo-fi meditation hella marxism swag craft beer fanny pack irony photo booth celiac cliche neutra. Flexitarian blog jawn skateboard squid man bun hell of lumbersexual health goth la croix bodega boys. Gochujang DSA bruh irony fanny pack post-ironic portland typewriter hell of. Cray viral lomo cold-pressed sriracha tilde.",
                abv: "6",
                ibu: "37",
                yearCreated: 2017,
                available: true,
                headline: "This is a great beer",
                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                subStyleId: "b93f5cd4-6e83-4cd7-9428-a2c5ba0c47bf",
                userId: "cm1q68hds0000146zv7kkvnnu"
            }
        });
        const beer1 = await onImageEdit(
            "https://ijtvuxdbxfqssvyrwmla.supabase.co/storage/v1/object/public/images-bucket/1729696324903-tinywow_9d9087_d1e2f39bddb243bf86789497ce91046fmv2_67552468.png"
        );
        const beer2 = await onImageEdit(
            "https://ijtvuxdbxfqssvyrwmla.supabase.co/storage/v1/object/public/images-bucket/1729696326047-tinywow_9d9087_2aec6926612a487e887c6be409f6c9d0mv2_67552468.png"
        );
        const beer1Url = await uploadImage(beer1, "images-bucket");
        const beer2Url = await uploadImage(beer2, "images-bucket");

        const beerImages = await prisma.beerImages.createMany({
            data: [
                {
                    image: beer1Url,
                    order: 1,
                    beerId: beer.id
                },
                {
                    image: beer2Url,
                    order: 2,
                    beerId: beer.id
                }
            ]
        });
        console.log(i, beer, beerImages);
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
