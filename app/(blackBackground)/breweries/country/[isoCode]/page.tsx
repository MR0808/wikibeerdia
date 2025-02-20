import { redirect } from "next/navigation";
import { biorhyme, assistant } from "@/app/fonts";
import "../../../../../node_modules/flag-icons/css/flag-icons.min.css";

import { getCountryBreweries } from "@/actions/breweries";
import { ParamsIsoCode } from "@/utils/types";
import BreweriesGridBrewery from "@/components/breweries/listing/BreweriesGridBrewery";
import { Suspense } from "react";
import BreweriesGridSkeleton from "@/components/breweries/listing/BreweriesGridSkeleton";
import siteMetadata from "@/utils/siteMetaData";
import { getAllCountries } from "@/data/location";

export async function generateStaticParams() {
    const data = await getAllCountries();
    return data ? data.map((country) => ({ isoCode: country.isoCode })) : [];
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ isoCode: string }>;
}) {
    const { isoCode } = await params;
    let data = await getCountryBreweries(isoCode);
    if (!data) {
        return;
    }

    let imageList = [`/images/countries/${isoCode}.jpg`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;

    return {
        title: ` Breweries by Country | ${data.name}`,
        description: `Breweries from ${data.name}`,
        openGraph: {
            title: data.name,
            description: `Breweries from ${data.name}`,
            url: `${siteMetadata.siteUrl}/breweries/country/${isoCode}`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "website",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title: data.name,
            description: `Breweries from ${data.name}`,
            images: ogImages
        }
    };
}

const BreweriesCountryPage = async (props: { params: ParamsIsoCode }) => {
    const { isoCode } = await props.params;
    const country = await getCountryBreweries(isoCode);
    if (!country) redirect("/breweries/country/");
    const backgroundImageUrl = `/images/countries/${isoCode}.jpg`;

    return (
        <div
            className="h-84 bg-black bg-cover bg-center drop-shadow-lg md:h-96"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="h-full bg-black/70">
                <div
                    className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-6xl font-semibold text-white md:pt-48`}
                >
                    <div>Breweries from {country.name}</div>
                    <div className="rounded bg-black/20 p-2 shadow-2xl">
                        <span
                            className={`fi fi-${isoCode.toLowerCase()} rounded shadow-2xl`}
                        ></span>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BreweriesGridSkeleton />}>
                {country.breweries ? (
                    <div className={`${assistant.className} container mt-10`}>
                        <div className="text-2xl font-semibold">{`${country.breweries.length} brewer${country.breweries.length === 1 ? "y" : "ies"} found`}</div>
                        <div className="mt-10 grid grid-cols-3 gap-10">
                            {country.breweries.map((brewery) => {
                                return (
                                    <BreweriesGridBrewery
                                        key={brewery.id}
                                        brewery={brewery}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div>No breweries for this country found</div>
                )}
            </Suspense>
        </div>
    );
};
export default BreweriesCountryPage;
