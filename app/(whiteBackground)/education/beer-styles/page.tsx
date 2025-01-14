import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import StylesHero from "@/components/education/StylesHero";
import { getAllBeerStyles, getBeerStylesByParent } from "@/actions/beerStyles";
import StylesSection from "@/components/education/StylesSection";
import siteMetadata from "@/utils/siteMetaData";

export function generateMetadata(): Metadata {
    const imageList = [`${siteMetadata.siteUrl}/images/bg-styles.jpg`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | Beer Styles`,
        description:
            "Learn about the wonderful world of beer and the different styles that defines them.",
        openGraph: {
            title: "Beer styles and their details",
            description:
                "Learn about the wonderful world of beer and the different styles that defines them.",
            url: `${siteMetadata.siteUrl}/education/beer-styles/`,
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
            title: "Beer styles and their details",
            description:
                "Learn about the wonderful world of beer and the different styles that defines them.",
            images: ogImages
        }
    };
}

const BeerStylesPage = async () => {
    const { data } = await getAllBeerStyles();

    if (!data) redirect("/");

    return (
        <div className="bg-[#FFFFF5] pb-20">
            <StylesHero />
            <div className="container flex flex-col justify-between px-8 pt-10 sm:justify-between sm:space-x-0">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-base"
                                href="/education"
                            >
                                Education
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base">
                                Beer Styles
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:mt-20pb-10 container mt-10 flex flex-col justify-between pb-10 sm:justify-between sm:space-x-0 md:pb-0">
                <div className="flex flex-col justify-between md:flex-row">
                    <div className="mb-10 text-center text-xl font-semibold italic md:hidden">
                        "Beer is more than just a drink — it's a story of
                        culture, tradition, and craftsmanship"
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image
                            src="/images/beertypes.jpg"
                            alt="Beer styles"
                            width={500}
                            height={500}
                            className="ease rounded-2xl object-cover object-center"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="mt-10 flex flex-col items-center justify-center justify-items-center space-y-10 md:mt-0 md:w-1/2">
                        <div className="hidden text-center text-5xl font-semibold italic md:block">
                            "Beer is more than just a drink — it's a story of
                            culture, tradition, and craftsmanship"
                        </div>
                        <div className="items-center space-y-5 text-left text-base md:w-4/5">
                            <p>
                                Whether you're a seasoned enthusiast or just
                                beginning your journey, understanding beer
                                styles enhances your appreciation for every sip.
                                Beer is one of the oldest and most diverse
                                beverages in the world, with a history that
                                dates back thousands of years.
                            </p>
                            <p>
                                Each beer style tells a story of its origin, the
                                people who created it, and the cultural
                                traditions that shaped it. From the crisp lagers
                                of Germany to the bold IPAs born out of British
                                and American ingenuity, beer reflects the
                                ingenuity and passion of its brewers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <StylesSection parentStyles={data} />
        </div>
    );
};
export default BeerStylesPage;
