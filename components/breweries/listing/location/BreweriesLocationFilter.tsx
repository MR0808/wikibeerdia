"use client";

import { LngLatBounds } from "mapbox-gl";
import { useEffect, useState, useTransition, useOptimistic } from "react";

import { useMapStore } from "@/hooks/useMapStore";

import { BreweriesListing } from "@/types/breweries";
import BreweriesLocationGridBrewery from "./BreweriesLocationGridBrewery";
import BreweriesLocationGridSkeleton from "./BreweriesLocationGridSkeleton";

interface MapProps {
    fetchLocations: (bounds: LngLatBounds) => Promise<BreweriesListing[]>;
}

const BreweriesLocationFilter: React.FC<MapProps> = ({ fetchLocations }) => {
    const { bounds } = useMapStore();
    const [locations, setLocations] = useState<BreweriesListing[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            if (!bounds) return;
            fetchLocations(bounds).then((result) => {
                setLocations(result);
                setIsLoading(false);
            });
        };
        fetchData();
    }, [bounds]);

    return (
        <div className="grid grid-cols-1 gap-10 overflow-auto md:grid-cols-2">
            {isLoading ? (
                <BreweriesLocationGridSkeleton />
            ) : (
                locations.map((location) => {
                    return (
                        <BreweriesLocationGridBrewery
                            brewery={location}
                            key={location.id}
                        />
                    );
                })
            )}
        </div>
    );
};
export default BreweriesLocationFilter;
