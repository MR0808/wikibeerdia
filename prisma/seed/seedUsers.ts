import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { uploadImage } from "../../utils/supabase";

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
    for (let i = 0; i < 200; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const displayName = faker.internet.username();
        const email = faker.internet.email();
        const emailVerified = faker.date.anytime();
        const imageUrl = await onImageEdit(faker.image.avatar());
        const image = await uploadImage(imageUrl, "profile-bucket");
        const password = faker.internet.password();
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                displayName,
                password,
                emailVerified,
                image
            }
        });
        console.log(user);
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
