import { biorhyme } from "@/app/fonts";

import BreweriesLocationContainer from "@/components/breweries/listing/location/BreweriesLocationContainer";
import { getBreweryTypesForms } from "@/actions/breweryTypes";
import { GoogleMapsProvider } from "@/Providers/GoogleMapsProvider";

const BreweriesLocation = async () => {
    const types = await getBreweryTypesForms();

    return (
        <div className="bg-location-bg h-48 bg-black bg-cover bg-center drop-shadow-lg">
            <div className="h-full bg-black/70">
                <div
                    className={`${biorhyme.className} my-auto flex h-full flex-col content-center items-center space-y-5 pt-28 align-bottom text-2xl font-semibold text-white md:container md:text-6xl`}
                >
                    <div className="px-8 text-center md:px-0">
                        Breweries around the world
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
