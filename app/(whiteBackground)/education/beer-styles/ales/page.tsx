import Link from "next/link";
import type { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { getBeerStylesByParent } from "@/actions/beerStyles";
import AlesHero from "@/components/education/AlesHero";
import TableOfContentsItem from "@/components/education/TableOfContentsItem";
import siteMetadata from "@/utils/siteMetaData";

export function generateMetadata(): Metadata {
    const imageList = [`${siteMetadata.siteUrl}/ale-bg.png`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | Beer Styles | Ales`,
        description:
            "Learn about ales and what makes them so popular, and all the different types.",
        openGraph: {
            title: "Ales and their details",
            description:
                "Learn about ales and what makes them so popular, and all the different types",
            url: `${siteMetadata.siteUrl}/education/beer-styles/ales/`,
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
            title: "Ales and their details",
            description:
                "Learn about ales and what makes them so popular, and all the different types",
            images: ogImages
        }
    };
}

const AlesInfoPage = async () => {
    const { data: aleStyles } = await getBeerStylesByParent("ales");

    return (
        <div className="bg-[#FFFFF5] pb-20">
            <AlesHero />
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
                            <BreadcrumbLink
                                className="text-base"
                                href="/education/beer-styles"
                            >
                                Beer Styles
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base">
                                Ales
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="container flex flex-col pt-10 md:flex-row md:space-x-8">
                <div className="scroll-mt-28 space-y-10 pb-10 md:w-1/3 md:pb-0">
                    <details
                        className="border-dark text-dark max-h-[90vh] overflow-hidden overflow-y-auto rounded-lg border-[1px] border-solid p-4 md:sticky md:top-6"
                        open
                    >
                        <summary className="cursor-pointer text-lg font-semibold capitalize">
                            Table of Contents
                        </summary>
                        <ul className="font-in mt-4 text-base">
                            <li className="py-1">
                                <Link
                                    href="#details"
                                    data-level="two"
                                    className="border-dark/40 flex items-center justify-start border-solid data-[level=three]:pl-4 data-[level=two]:border-t data-[level=two]:pt-2 data-[level=two]:pl-0 sm:data-[level=three]:pl-6"
                                >
                                    <span className="hover:underline">
                                        Details
                                    </span>
                                </Link>
                            </li>
                            {aleStyles &&
                                aleStyles.map((style, index) => (
                                    <TableOfContentsItem
                                        key={index}
                                        item={style}
                                    />
                                ))}
                        </ul>
                    </details>
                </div>
                <article className="flex flex-col space-y-8 md:w-2/3">
                    <div
                        className="flex scroll-mt-28 flex-col space-y-5 border-b pb-10"
                        id="details"
                    >
                        <h1 className="pb-5 text-4xl font-semibold">Details</h1>
                        <p>
                            Ale is one of the oldest and most diverse beer
                            styles, dating back thousands of years. Its defining
                            feature is the use of top-fermenting yeast
                            (Saccharomyces cerevisiae), which ferments at warmer
                            temperatures, typically between 60-75°F (15-24°C).
                            This warmer fermentation process encourages the
                            production of a wide range of flavors, including
                            fruity, spicy, and sometimes even earthy or herbal
                            notes. Ales are generally more robust and complex
                            than lagers, making them a favorite among craft beer
                            enthusiasts and those who appreciate a variety of
                            tastes.
                        </p>
                        <p>
                            The category of ales encompasses numerous
                            sub-styles, each with distinct characteristics. Pale
                            ales, for instance, are known for their balance
                            between malt sweetness and hop bitterness, often
                            with a crisp and refreshing finish. India Pale Ales
                            (IPAs) take this a step further by emphasizing
                            hop-forward flavors, with variations like West Coast
                            IPAs offering intense bitterness and New England
                            IPAs showcasing juicy, tropical aromas. Meanwhile,
                            dark ales such as stouts and porters are
                            characterized by their roasted malt profiles,
                            delivering flavors reminiscent of coffee, chocolate,
                            and caramel.
                        </p>
                        <p>
                            Another notable ale style is the wheat ale, which
                            uses a significant proportion of wheat in the grain
                            bill. These beers are typically light, refreshing,
                            and often hazy, with sub-styles like Belgian Witbier
                            offering spice additions such as coriander and
                            orange peel. German Hefeweizens stand out for their
                            banana and clove notes, derived from specific yeast
                            strains. Each ale style offers a unique experience,
                            making this category incredibly versatile and
                            appealing to a wide range of palates.
                        </p>
                        <p>
                            Ales also pair well with an array of foods, from
                            hearty grilled meats to rich desserts. Their complex
                            flavor profiles can complement or contrast with
                            dishes, enhancing the overall dining experience.
                            Whether you're savoring a creamy stout with
                            chocolate cake or enjoying a crisp pale ale with
                            spicy tacos, ales provide endless opportunities to
                            explore the interplay between beer and cuisine.
                        </p>
                    </div>
                    {aleStyles &&
                        aleStyles.map((style, index) => {
                            return (
                                <div
                                    className="flex scroll-mt-28 flex-col space-y-5 pb-10"
                                    id={style.slug}
                                    key={index}
                                >
                                    <h1 className="pb-5 text-4xl font-semibold">
                                        {style.name}
                                    </h1>
                                    {style.subStyles &&
                                        style.subStyles.map(
                                            (subStyle, index) => {
                                                return (
                                                    <div
                                                        className="flex scroll-mt-28 flex-col space-y-5 border-b pb-10"
                                                        id={subStyle.slug}
                                                        key={index}
                                                    >
                                                        <h1 className="text-3xl font-semibold">
                                                            {subStyle.name}
                                                        </h1>
                                                        <div className="flex flex-col space-y-1">
                                                            <p>
                                                                <span className="font-medium">
                                                                    ABV:{" "}
                                                                </span>
                                                                {`${subStyle.abvLow}% - ${subStyle.abvHigh}%`}
                                                            </p>
                                                            <p>
                                                                <span className="font-medium">
                                                                    IBU:{" "}
                                                                </span>
                                                                {`${subStyle.ibuLow} - ${subStyle.ibuHigh}`}
                                                            </p>
                                                        </div>
                                                        <p>
                                                            {
                                                                subStyle.description
                                                            }
                                                        </p>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            );
                        })}
                </article>
            </div>
        </div>
    );
};
export default AlesInfoPage;
