import { biorhyme } from "@/app/fonts";
import BreweriesLocationContainer from "@/components/breweries/listing/location/BreweriesLocationContainer";
import { LngLatBounds } from "mapbox-gl";

const BreweriesLocation = () => {
    const fetchLocations = async (bounds: LngLatBounds) => {
        const res = await fetch(
            `/api/locations?swLat=${bounds.getSouthWest().lat}&swLng=${bounds.getSouthWest().lng}&neLat=${bounds.getNorthEast().lat}&neLng=${bounds.getNorthEast().lng}`
        );
        return res.json();
    };

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
                <BreweriesLocationContainer />
            </div>
        </div>
    );
};
export default BreweriesLocation;
