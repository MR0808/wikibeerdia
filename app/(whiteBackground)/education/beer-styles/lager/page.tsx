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
import LagerHero from "@/components/education/LagerHero";
import TableOfContentsItem from "@/components/education/TableOfContentsItem";
import siteMetadata from "@/utils/siteMetaData";

export function generateMetadata(): Metadata {
    const imageList = [`${siteMetadata.siteUrl}/lager-bg.png`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | Beer Styles | Lagers`,
        description:
            "Learn about lagers and what makes them so popular, and all the different types.",
        openGraph: {
            title: "Lagers and their details",
            description:
                "Learn about lagers and what makes them so popular, and all the different types",
            url: `${siteMetadata.siteUrl}/education/beer-styles/lager/`,
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
            title: "Lagers and their details",
            description:
                "Learn about lagers and what makes them so popular, and all the different types",
            images: ogImages
        }
    };
}

const LagerInfoPage = async () => {
    const { data: lagerStyles } = await getBeerStylesByParent("lager");

    return (
        <div className="bg-[#FFFFF5] pb-20">
            <LagerHero />
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
                                Lagers
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
                            {lagerStyles &&
                                lagerStyles.map((style, index) => (
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
                            Unlike ales, lagers are brewed with
                            bottom-fermenting yeast (Saccharomyces pastorianus)
                            that ferments at cooler temperatures, typically
                            between 45-55°F (7-13°C). This slower and colder
                            fermentation process minimizes the production of
                            fruity esters and spicy phenols, resulting in a beer
                            that is more restrained in flavor. Lagers are known
                            for their approachable and refreshing qualities,
                            making them a staple in both casual drinking and
                            large-scale production.
                        </p>
                        <p>
                            One of the most iconic lager styles is the pilsner,
                            which originated in the Czech Republic. Pilsners are
                            pale, golden beers with a refreshing bitterness and
                            floral hop aroma. Czech pilsners tend to have a
                            slightly sweeter malt backbone, while German
                            pilsners are crisper and more bitter. Other notable
                            pale lagers include Helles, a malt-forward German
                            lager with a smooth, balanced profile, and American
                            lagers, which are lighter and often brewed with
                            adjuncts like rice or corn to enhance their
                            crispness.
                        </p>
                        <p>
                            Lagers also encompass a variety of darker styles,
                            such as Dunkel and Bock. Dunkels are Bavarian dark
                            lagers with rich malt flavors of caramel, toffee,
                            and a touch of nuttiness, while Bocks are stronger
                            lagers with a robust malt character. Sub-styles of
                            Bock include Maibock, a lighter spring beer;
                            Doppelbock, a darker and more intense version; and
                            Eisbock, a highly concentrated beer created by
                            freezing and removing water to increase alcohol
                            content. These darker lagers highlight the
                            versatility of the style, proving that lagers are
                            far more diverse than their pale counterparts.
                        </p>
                        <p>
                            Lagers pair wonderfully with a variety of foods due
                            to their clean and versatile flavor profiles.
                            Pilsners and Helles lagers complement lighter dishes
                            like salads, seafood, and chicken, while darker
                            lagers like Dunkels and Bocks can stand up to
                            heartier fare, such as roasted meats and rich stews.
                            Their smoothness and balance also make them an
                            excellent choice for casual gatherings or as a
                            refreshing counterpoint to spicy or fried foods.
                            Whether you prefer the simplicity of a pale lager or
                            the complexity of a Bock, lagers offer something for
                            every beer lover.
                        </p>
                    </div>
                    {lagerStyles &&
                        lagerStyles.map((style, index) => {
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
export default LagerInfoPage;
