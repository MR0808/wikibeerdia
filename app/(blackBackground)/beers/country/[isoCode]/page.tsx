import { redirect } from "next/navigation";
import { biorhyme, assistant } from "@/app/fonts";
import "../../../../../node_modules/flag-icons/css/flag-icons.min.css";

import { getCountryBeers } from "@/actions/beers";
import { ParamsIsoCode } from "@/utils/types";
import BeersGridBeerCountry from "@/components/beers/listing/country/BeersGridBeerCountry";
import { Suspense } from "react";
import BeersGridSkeleton from "@/components/beers/listing/BeersGridSkeleton";
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
    let data = await getCountryBeers(isoCode);
    if (!data) {
        return;
    }
    let imageList = [`/images/countries/${isoCode}.jpg`];
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;

    return {
        title: ` Beers by Country | ${data.name}`,
        description: `Beers from ${data.name}`,
        openGraph: {
            title: data.name,
            description: `Beers from ${data.name}`,
            url: `${siteMetadata.siteUrl}/beers/country/${isoCode}`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "website",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title: data.name,
            description: `Beers from ${data.name}`,
            images: ogImages
        }
    };
}

const BeersCountryPage = async (props: { params: Promise<ParamsIsoCode> }) => {
    const { isoCode } = await props.params;
    const country = await getCountryBeers(isoCode);
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
                    <div>Beers from {country.name}</div>
                    <div className="rounded bg-black/20 p-2 shadow-2xl">
                        <span
                            className={`fi fi-${isoCode.toLowerCase()} rounded shadow-2xl`}
                        ></span>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BeersGridSkeleton />}>
                {country.totalBeers > 0 ? (
                    <div className={`${assistant.className} container mt-10`}>
                        <div className="text-2xl font-semibold">{`${country.totalBeers} beer${country.totalBeers === 1 ? "" : "s"} found`}</div>
                        <div className="mt-10 grid grid-cols-3 gap-10">
                            {country.breweries.map((brewery) => {
                                const breweryProp = {
                                    slug: brewery.slug,
                                    name: brewery.name,
                                    region: brewery.region,
                                    country: country.name || ""
                                };
                                return brewery.beers.map((beer) => {
                                    return (
                                        <BeersGridBeerCountry
                                            key={beer.id}
                                            beer={beer}
                                            brewery={breweryProp}
                                        />
                                    );
                                });
                            })}
                        </div>
                    </div>
                ) : (
                    <div>No beers for this country found</div>
                )}
            </Suspense>
        </div>
    );
};
export default BeersCountryPage;
