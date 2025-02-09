import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const generateAustralianLatLong = () => {
        const minLat = -44; // Southernmost point (Tasmania)
        const maxLat = -10; // Northernmost point
        const minLng = 112; // Westernmost point
        const maxLng = 154; // Easternmost point

        // Generate random latitude and longitude within bounds
        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLng - minLng) + minLng;

        return { latitude, longitude };
    };
    const generateEnglishLatLong = () => {
        const minLat = 49.9;
        const maxLat = 55.8;
        const minLng = -6.4;
        const maxLng = 1.8;

        // Generate random latitude and longitude within bounds
        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLng - minLng) + minLng;

        return { latitude, longitude };
    };
    const generateAmericanLatLong = () => {
        const minLat = 24.396308; // Southernmost point (Florida)
        const maxLat = 49.384358; // Northernmost point (Canada border)
        const minLng = -125.0; // Westernmost point (California)
        const maxLng = -66.93457; // Easternmost point (Maine)

        // Generate random latitude and longitude within bounds
        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLng - minLng) + minLng;

        return { latitude, longitude };
    };
    const generateGermanLatLong = () => {
        const minLat = 47.3;
        const maxLat = 55.1;
        const minLng = 5.9;
        const maxLng = 15.0;

        // Generate random latitude and longitude within bounds
        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLng - minLng) + minLng;

        return { latitude, longitude };
    };
    const breweries = await prisma.brewery.findMany();
    const breweryLength = breweries.length;
    let countBreweries = 0;

    for (const brewery of breweries) {
        let latLong = generateAustralianLatLong();
        if (countBreweries > 100 && countBreweries <= 200)
            latLong = generateEnglishLatLong();
        if (countBreweries > 200 && countBreweries <= 300)
            latLong = generateAmericanLatLong();
        if (countBreweries > 300) latLong = generateGermanLatLong();

        const latitude = latLong.latitude.toString();
        const longitude = latLong.longitude.toString();

        await prisma.brewery.update({
            where: { id: brewery.id },
            data: { latitude, longitude }
        });
        countBreweries++;
        console.log(`${countBreweries} / ${breweryLength}`);
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
