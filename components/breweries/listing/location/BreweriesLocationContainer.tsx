"use client";

import dynamic from "next/dynamic";
import { LngLatBounds } from "mapbox-gl";
import BreweriesLocationFilter from "./BreweriesLocationFilter";

const BreweriesLocationContainer = () => {
    const fetchLocations = async (bounds: LngLatBounds) => {
        const res = await fetch(
            `/api/locations?swLat=${bounds.getSouthWest().lat}&swLng=${bounds.getSouthWest().lng}&neLat=${bounds.getNorthEast().lat}&neLng=${bounds.getNorthEast().lng}`
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
            <div className="w-1/2 p-10">
                <BreweriesLocationSearch />
                <BreweriesLocationFilter fetchLocations={fetchLocations} />
            </div>
            <div className="w-1/2">
                <BreweriesLocationMap fetchLocations={fetchLocations} />
            </div>
        </>
    );
};
export default BreweriesLocationContainer;
