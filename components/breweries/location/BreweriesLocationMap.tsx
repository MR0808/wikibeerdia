"use client";

import dynamic from "next/dynamic";
import { LngLatBounds } from "mapbox-gl";
import BreweriesLocationFilter from "./BreweriesLocationFilter";

const BreweriesLocationMap = () => {
    const fetchLocations = async (bounds: LngLatBounds) => {
        const res = await fetch(
            `/api/locations?swLat=${bounds.getSouthWest().lat}&swLng=${bounds.getSouthWest().lng}&neLat=${bounds.getNorthEast().lat}&neLng=${bounds.getNorthEast().lng}`
        );
        return res.json();
    };

    // Lazy load the Map component (important for SSR in Next.js)
    const Map = dynamic(() => import("@/components/global/map"), {
        ssr: false
    });

    return (
        <>
            <div className="w-1/2">
                <BreweriesLocationFilter fetchLocations={fetchLocations} />
            </div>
            <div className="w-1/2">
                <Map fetchLocations={fetchLocations} />
            </div>
        </>
    );
};
export default BreweriesLocationMap;
