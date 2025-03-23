import { biorhyme } from "@/app/fonts";

import BreweriesLocationContainer from "@/components/breweries/listing/map/BreweriesLocationContainer";
import { getBreweryTypesForms } from "@/actions/breweryTypes";
import { GoogleMapsProvider } from "@/Providers/GoogleMapsProvider";
import siteMetadata from "@/utils/siteMetaData";

export async function generateMetadata() {
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    const authors = siteMetadata.author;
    const title = "Breweries Mapped";
    const description =
        "Find your next favourite brewery anywhere on the globe!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/breweries/map`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "website",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages
        }
    };
}

const BreweriesLocation = async () => {
    const types = await getBreweryTypesForms();

    return (
        <div className="bg-location-bg h-48 bg-black bg-cover bg-center drop-shadow-lg">
            <div className="h-full bg-black/70">
                <div
                    className={`${biorhyme.className} my-auto flex h-full flex-col content-center items-center space-y-5 pt-28 align-bottom text-2xl font-semibold text-white md:container md:text-6xl`}
                >
                    <div className="px-8 text-center md:px-0">
                        Breweries by the Map
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse md:h-[calc(100vh-192px)] md:flex-row">
                <GoogleMapsProvider apiKey={process.env.GOOGLE_PLACES_API_KEY!}>
                    <BreweriesLocationContainer types={types} />
                </GoogleMapsProvider>
            </div>
        </div>
    );
};
export default BreweriesLocation;
