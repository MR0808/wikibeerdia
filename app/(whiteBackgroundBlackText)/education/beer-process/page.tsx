import Image from "next/image";
import type { Metadata } from "next";

import ProcessHero from "@/components/education/ProcessHero";
import { shrikhand } from "@/app/fonts";
import siteMetadata from "@/utils/siteMetaData";
import BeerProcessSteps from "@/components/education/BeerProcessSteps";

export function generateMetadata(): Metadata {
    const imageList = [
        `${siteMetadata.siteUrl}/images/ingredients.png`,
        `${siteMetadata.siteUrl}/images/finished-beer.png`,
        `${siteMetadata.siteUrl}/images/vat.png`,
        `${siteMetadata.siteUrl}/images/step1-malt.jpg`,
        `${siteMetadata.siteUrl}/images/step2-mashing.jpg`,
        `${siteMetadata.siteUrl}/images/step3-lautering.jpg`,
        `${siteMetadata.siteUrl}/images/step4-boiling.jpg`,
        `${siteMetadata.siteUrl}/images/step5-fermentation.jpg`,
        `${siteMetadata.siteUrl}/images/step6-conditioning.jpg`,
        `${siteMetadata.siteUrl}/images/step7-filtering.jpg`,
        `${siteMetadata.siteUrl}/images/step8-enjoying.jpg`
    ];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | How Beer is Made`,
        description:
            "Learn about the process of making beer and how this wonderful nectar ends up in your bottles!",
        openGraph: {
            title: "How Beer is Made",
            description:
                "Learn about the process of making beer and how this wonderful nectar ends up in your bottles!",
            url: `${siteMetadata.siteUrl}/education/beer-process/`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "article",
            publishedTime: "2024-08-15 13:00:00",
            modifiedTime: "2024-08-15 13:00:00",
            images: ogImages,
            authors: [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title: "How Beer is Made",
            description:
                "Learn about the process of making beer and how this wonderful nectar ends up in your bottles!",
            images: ogImages
        }
    };
}

const BeerProcessPage = () => {
    return (
        <>
            <div className="bg-primary/15 pb-16">
                <ProcessHero />
            </div>
            <div className="container mt-5 mb-10 flex flex-col justify-between pb-10 sm:justify-between sm:space-x-0 md:mt-10 md:pb-0">
                <div className="flex flex-col justify-center md:flex-row">
                    <div className="mb-10 text-center text-xl font-semibold italic md:hidden">
                        "Beer isn't just made, it's created, it's a long
                        process, created with love!"
                    </div>
                    <div className="flex w-full flex-row justify-center md:w-1/2">
                        <Image
                            src="/images/vat.png"
                            alt="Beer styles"
                            width={500}
                            height={500}
                            className="ease rounded-2xl object-cover object-center"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="mt-10 flex flex-col items-center justify-center justify-items-center space-y-10 md:mt-0 md:w-1/2">
                        <div className="hidden text-center text-5xl font-semibold italic md:block">
                            "Beer isn't just made, it's created, it's a long
                            process, created with love!""
                        </div>
                        <div className="items-center space-y-5 text-left text-lg md:w-4/5">
                            <p>
                                Welcome to our extensive guide on how beer is
                                made! Brewing beer is a captivating process that
                                blends ancient traditions with modern
                                innovations, creating a wide range of flavors,
                                aromas, and styles. This intricate craft
                                transforms simple ingredients into one of the
                                world's most beloved beverages.
                            </p>
                            <p>
                                Each step in the brewing process plays a vital
                                role in shaping the unique characteristics of
                                the final product. Dive into this detailed
                                exploration of beer making, complete with
                                imagery suggestions to visualize every stage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white">
                <div className="container mt-20 flex flex-col justify-between py-20">
                    <h1
                        className={`${shrikhand.className} text-center text-4xl leading-snug font-bold text-slate-600 uppercase drop-shadow-2xl sm:leading-snug md:text-6xl md:leading-[1.2]`}
                    >
                        The Beer Making Process
                    </h1>
                    <h2 className="text-center text-xl leading-[1.2] text-slate-600 drop-shadow-2xl">
                        Beer making is a rewarding process that celebrates the
                        harmony of nature's ingredients and human ingenuity.
                    </h2>
                </div>
                <BeerProcessSteps />
            </div>
        </>
    );
};
export default BeerProcessPage;
