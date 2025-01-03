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
import HybridHero from "@/components/education/HybridHero";
import TableOfContentsItem from "@/components/education/TableOfContentsItem";
import siteMetadata from "@/utils/siteMetaData";

export function generateMetadata(): Metadata {
    const imageList = [`${siteMetadata.siteUrl}/hybrid-bg.png`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | Beer Styles | Hybrid/Mixed Beers`,
        description:
            "Learn about hybrid/mixed beers and what makes them so different.",
        openGraph: {
            title: "Hybrid/Mixed beers and their details",
            description:
                "Learn about hybrid/mixed beers and what makes them so different.",
            url: `${siteMetadata.siteUrl}/education/beer-styles/hybrid-mixed/`,
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
            title: "Hybrid/Mixed beers and their details",
            description:
                "Learn about hybrid/mixed beers and what makes them so different.",
            images: ogImages
        }
    };
}

const HybridInfoPage = async () => {
    const { data: hybridStyles } = await getBeerStylesByParent("hybrid-mixed");

    return (
        <div className="bg-[#FFFFF5] pb-20">
            <HybridHero />
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
                                Hybrid/Mixed Beers
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
                            {hybridStyles &&
                                hybridStyles.map((style, index) => (
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
                            Hybrid or mixed beer styles blend the techniques and
                            characteristics of both ales and lagers, resulting
                            in unique and creative brews. These styles challenge
                            traditional beer categorizations, often combining
                            the use of ale or lager yeast with fermentation
                            processes that deviate from the norm. This
                            hybridization allows brewers to experiment with
                            flavor profiles and textures, producing beers that
                            offer the best of both worlds. These beers appeal to
                            a broad audience, as they often merge the robust
                            flavors of ales with the crispness and smoothness of
                            lagers.
                        </p>
                        <p>
                            One of the most notable hybrid styles is Kölsch, a
                            beer that originated in Cologne, Germany. Kölsch is
                            brewed using ale yeast but fermented at cooler,
                            lager-like temperatures. The result is a light,
                            crisp beer with subtle fruity notes and a clean
                            finish. Kölsch is traditionally served in small
                            cylindrical glasses, called “Stange,” which help
                            preserve its delicate aromas and refreshing
                            qualities. Its versatility makes it a favorite for
                            warm weather and light food pairings.
                        </p>
                        <p>
                            Another example is Altbier, a traditional German
                            beer from Düsseldorf. Altbier uses ale yeast but
                            undergoes cold maturation like a lager, which
                            creates a smooth and balanced beer. Typically amber
                            to copper in color, Altbier offers a malty backbone
                            with restrained bitterness, making it a great choice
                            for those who enjoy malt-forward beers without
                            excessive sweetness. California Common, also known
                            as steam beer, is another hybrid style that uses
                            lager yeast fermented at warmer, ale-like
                            temperatures. This method produces a toasty, caramel
                            malt character with mild hop bitterness, exemplified
                            by Anchor Steam Beer.
                        </p>
                        <p>
                            Cream Ale is a quintessential American hybrid style
                            that combines ale fermentation with lagering
                            techniques. These beers are light, smooth, and
                            slightly sweet, often brewed with adjuncts like corn
                            or rice for added crispness. Cream Ales showcase how
                            hybrids can be both approachable and innovative,
                            appealing to those who enjoy lighter beers with a
                            touch of complexity. Overall, hybrid beer styles
                            highlight the ingenuity of brewers and the endless
                            possibilities in beer making, bridging the gap
                            between traditional ale and lager styles while
                            creating something entirely unique.
                        </p>
                    </div>
                    {hybridStyles &&
                        hybridStyles.map((style, index) => {
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
export default HybridInfoPage;
