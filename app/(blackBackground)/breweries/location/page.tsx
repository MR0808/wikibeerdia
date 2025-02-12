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
                    className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-28 align-bottom text-6xl font-semibold text-white`}
                >
                    <div>Breweries around the world</div>
                </div>
            </div>
            <div className="flex h-[calc(100vh-192px)] flex-row">
                <GoogleMapsProvider apiKey={process.env.GOOGLE_PLACES_API_KEY!}>
                    <BreweriesLocationContainer types={types} />
                </GoogleMapsProvider>
            </div>
        </div>
    );
};
export default BreweriesLocation;
