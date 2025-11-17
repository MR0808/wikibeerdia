import Link from "next/link";
import { redirect } from "next/navigation";
import parse from "html-react-parser";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ParamsSlug } from "@/utils/types";
import { getParentStyle, getParentStyles } from "@/actions/beerStyles";
import ParentStylesHero from "@/components/education/ParentStylesHero";
import TableOfContentsItem from "@/components/education/TableOfContentsItem";
import siteMetadata from "@/utils/siteMetaData";

export async function generateStaticParams() {
    const { data: styles } = await getParentStyles();
    return styles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: style } = await getParentStyle(slug);
    if (!style) {
        return;
    }

    const imageList = [`${siteMetadata.siteUrl}${style.image}`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    return {
        title: ` Education | Beer Styles | ${style.name}`,
        description: `Learn about ${style.name} and what makes them so popular, and all the different types.`,
        openGraph: {
            title: `${style.name} and their details`,
            description: `Learn about ${style.name} and what makes them so popular, and all the different types`,
            url: `${siteMetadata.siteUrl}/education/beer-styles/${style.slug}/`,
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
            title: `${style.name} and their details`,
            description: `Learn about ${style.name} and what makes them so popular, and all the different types`,
            images: ogImages
        }
    };
}

const ParentStyleInfoPage = async (props: { params: Promise<ParamsSlug> }) => {
    const { slug } = await props.params;
    const { data } = await getParentStyle(slug);

    if (!data) redirect("/");

    return (
        <div className="bg-[#FFFFF5] pb-20">
            <ParentStylesHero
                image={data.image}
                headline={data.headline}
                name={data.name}
            />
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
                                {data.name}
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
                            {data.styles &&
                                data.styles.map((style, index) => (
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
                        <div className="whitespace-break-spaces">
                            {parse(data.longDescription || "")}
                        </div>
                    </div>
                    {data.styles &&
                        data.styles.map((style, index) => {
                            return (
                                <div
                                    className="flex scroll-mt-28 flex-col space-y-5 border-b pb-10 last:border-b-0"
                                    id={style.slug}
                                    key={index}
                                >
                                    <Link
                                        href={`/beers/styles/${style.slug}`}
                                        className="pb-5 text-4xl font-semibold hover:underline"
                                    >
                                        {style.name}
                                    </Link>

                                    <div className="flex flex-col space-y-1">
                                        <p>
                                            <span className="font-medium">
                                                ABV:{" "}
                                            </span>
                                            {`${style.abvLow}% - ${style.abvHigh}%`}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                IBU:{" "}
                                            </span>
                                            {`${style.ibuLow} - ${style.ibuHigh}`}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                Origin:{" "}
                                            </span>
                                            {style.region
                                                .map(String)
                                                .join(", ")}
                                        </p>
                                    </div>
                                    <p>{style.description}</p>
                                </div>
                            );
                        })}
                </article>
            </div>
        </div>
    );
};
export default ParentStyleInfoPage;
