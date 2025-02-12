"use client";

import dynamic from "next/dynamic";
import { LngLatBounds } from "mapbox-gl";
import BreweriesLocationFilter from "./BreweriesLocationFilter";

const BreweriesLocationContainer = ({
    types
}: {
    types: {
        data: {
            id: string;
            name: string;
        }[];
    };
}) => {
    const fetchLocations = async (
        bounds: LngLatBounds,
        breweryType: string
    ) => {
        const res = await fetch(
            `/api/locations?swLat=${bounds.getSouthWest().lat}&swLng=${bounds.getSouthWest().lng}&neLat=${bounds.getNorthEast().lat}&neLng=${bounds.getNorthEast().lng}&breweryType=${breweryType}`
        );
        return res.json();
    };

    // Lazy load the Map component (important for SSR in Next.js)
    const BreweriesLocationMap = dynamic(
        () => import("./BreweriesLocationMap"),
        {
            ssr: false
        }
    );

    const BreweriesLocationSearch = dynamic(
        () => import("./BreweriesLocationSearch"),
        { ssr: false }
    );

    return (
        <>
            <div className="p-5 md:h-full md:w-3/5 md:overflow-y-scroll">
                <BreweriesLocationSearch types={types} />
                <BreweriesLocationFilter fetchLocations={fetchLocations} />
            </div>
            <div className="h-96 md:h-full md:w-2/5">
                <BreweriesLocationMap fetchLocations={fetchLocations} />
            </div>
        </>
    );
};
export default BreweriesLocationContainer;
