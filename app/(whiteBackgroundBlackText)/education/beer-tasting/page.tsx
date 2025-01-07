import Image from "next/image";
import type { Metadata } from "next";

import TastingHero from "@/components/education/TastingHero";
import TastingSteps from "@/components/education/TastingSteps";
import {
    tasting1,
    tasting2,
    tasting3,
    tasting4,
    tasting5
} from "@/components/education/descriptions";
import siteMetadata from "@/utils/siteMetaData";

export function generateMetadata(): Metadata {
    const imageList = [
        `${siteMetadata.siteUrl}/images/tasting-enjoying.png`,
        `${siteMetadata.siteUrl}/images/tasting-paddle.jpg`,
        `${siteMetadata.siteUrl}/images/tasting-smelling.jpg`,
        `${siteMetadata.siteUrl}/images/tasting-drinking.jpg`,
        `${siteMetadata.siteUrl}/images/tasting-bubbles.jpg`,
        `${siteMetadata.siteUrl}/images/tasting-finished.jpg`,
        `${siteMetadata.siteUrl}/images/tasting-why.jpg`
    ];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | Beer Tasting 101`,
        description:
            "Learn the best way to taste your beer, and how to get the best out of your beer journey!",
        openGraph: {
            title: "Beer Tasting 101",
            description:
                "Learn the best way to taste your beer, and how to get the best out of your beer journey!",
            url: `${siteMetadata.siteUrl}/education/beer-tasting/`,
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
            title: "Beer Tasting 101",
            description:
                "Learn the best way to taste your beer, and how to get the best out of your beer journey!",
            images: ogImages
        }
    };
}

const BeerTastingPage = () => {
    return (
        <div className="bg-primary-foreground/15 pb-16">
            <TastingHero />
            <div className="mt-10 flex flex-col justify-center space-y-10 rounded-2xl bg-white pb-28 align-middle md:mx-3 md:mt-20 md:space-y-0 md:px-10">
                <TastingSteps
                    step={1}
                    name="Appearance: Feast Your Eyes"
                    description={tasting1}
                    image="/images/tasting-paddle.jpg"
                />
                <TastingSteps
                    step={2}
                    name="Aroma: Engage Your Nose"
                    description={tasting2}
                    image="/images/tasting-smelling.jpg"
                />
                <TastingSteps
                    step={3}
                    name="Taste: Savor the Flavor"
                    description={tasting3}
                    image="/images/tasting-drinking.jpg"
                />
                <TastingSteps
                    step={4}
                    name="Mouthfeel: Feel the Texture"
                    description={tasting4}
                    image="/images/tasting-bubbles.jpg"
                />
                <TastingSteps
                    step={5}
                    name="Finish: The Lasting Impression"
                    description={tasting5}
                    image="/images/tasting-finished.jpg"
                />
            </div>
            <div className="mt-20 flex flex-col justify-center rounded-2xl bg-black px-5 pb-10 align-middle md:mx-3 md:px-10">
                <div className="mt-8 flex h-full flex-col justify-start space-y-10 pt-10 text-white md:container md:px-36">
                    <div className="text-center text-2xl font-semibold md:text-left md:text-4xl">
                        Why Learn to Taste Beer?
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-10">
                        <Image
                            src="/images/tasting-why.jpg"
                            width={500}
                            height={500}
                            alt="Why taste"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                            className="my-auto mb-10 h-fit rounded-2xl object-cover md:mb-0"
                        />
                        <div className="flex flex-col space-y-5">
                            <p>
                                Beer tasting is not just about enjoyment; it’s
                                about exploration. With thousands of styles and
                                variations, beer offers a world of flavors
                                waiting to be discovered. By honing your tasting
                                skills, you’ll gain a greater appreciation for
                                the artistry and innovation behind every pint.
                                You’ll also develop a more discerning palate,
                                allowing you to identify subtle differences in
                                ingredients, brewing techniques, and regional
                                styles.
                            </p>
                            <p>
                                Tasting beer thoughtfully also connects you to a
                                rich history and culture. From the monastic
                                brewing traditions of Belgium to the hop-forward
                                innovations of American craft brewers, every sip
                                tells a story.
                            </p>
                            <p>
                                Exploring beer is a lifelong adventure. Whether
                                you’re savoring a familiar favorite or
                                discovering a new style, there’s always
                                something exciting to learn and enjoy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BeerTastingPage;
