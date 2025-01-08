import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { uploadImage } from "../../utils/supabase";
import prismaRandom from "prisma-extension-random";
import { ImagesUpload } from "../../types/global";

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
    for (let i = 0; i < 200; i++) {
        const country = await prisma.country.findRandom({
            select: { id: true, name: true }
        });
        const breweryType = await prisma.breweryType.findRandom({
            where: {
                id: {
                    in: [
                        "Australia",
                        "United Kingdom",
                        "United States",
                        "New Zealand",
                        "Canada"
                    ]
                }
            },
            select: { id: true, name: true }
        });
        const user = await prisma.user.findRandom({
            select: { id: true }
        });
        const x = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
        const name = faker.company.name();
        const address1 = faker.location.streetAddress();
        const city = faker.location.city();
        const region = faker.location.state();
        const postalCode = faker.location.zipCode();
        const countryId = country?.id || "cm1pt6p0x036pajanvfyay0jf";
        const formattedAddress = `${address1}, ${city}, ${region}, ${country?.name}, ${postalCode}`;
        const description = faker.lorem.paragraphs({ min: 2, max: 5 });
        const website = faker.internet.url();
        const logo = await onImageEdit(faker.image.avatar());
        const logoUrl = await uploadImage(logo, "logos-bucket");
        const headline = faker.lorem.sentence({ min: 5, max: 10 });
        const breweryTypeId =
            breweryType?.id || "5de06308-8023-4b2a-85bb-6427adede27c";
        const images: ImagesUpload[] = [];
        for (let j = 0; j < x; j++) {
            const image = await onImageEdit(faker.image.urlPicsumPhotos());
            const imageUrl = await uploadImage(image, "images-bucket");
            images.push({ image: imageUrl, order: j });
        }
        const brewery = await prisma.brewery.create({
            data: {
                name,
                address1,
                city,
                region,
                postalCode,
                countryId,
                formattedAddress,
                description,
                website,
                logoUrl,
                headline,
                breweryTypeId,
                userId: user?.id || "cm1q68hds0000146zv7kkvnnu"
            }
        });
        for (const image of images) {
            await prisma.breweryImages.create({
                data: {
                    order: image.order,
                    image: image.image,
                    breweryId: brewery.id
                }
            });
        }
        console.log(name);
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
