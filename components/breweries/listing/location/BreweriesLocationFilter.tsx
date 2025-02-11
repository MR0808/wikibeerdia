"use client";

import { LngLatBounds } from "mapbox-gl";
import { useEffect, useState, useTransition, useOptimistic } from "react";

import { useMapStore } from "@/hooks/useMapStore";

import { BreweriesListing } from "@/types/breweries";
import BreweriesLocationGridBrewery from "./BreweriesLocationGridBrewery";
import BreweriesLocationGridSkeleton from "./BreweriesLocationGridSkeleton";

interface MapProps {
    fetchLocations: (
        bounds: LngLatBounds,
        breweryType: string
    ) => Promise<BreweriesListing[]>;
}

const BreweriesLocationFilter: React.FC<MapProps> = ({ fetchLocations }) => {
    const { bounds, breweryType } = useMapStore();
    const [locations, setLocations] = useState<BreweriesListing[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            if (!bounds) return;
            fetchLocations(bounds, breweryType).then((result) => {
                let filteredData = result;
                if (breweryType !== "all")
                    filteredData = result.filter(
                        (item) => item.breweryTypeId === breweryType
                    );
                setLocations(filteredData);
                setIsLoading(false);
            });
        };
        fetchData();
    }, [bounds, breweryType]);

    return (
        <>
            {isLoading ? (
                <BreweriesLocationGridSkeleton />
            ) : (
                <div className="flex flex-col">
                    <div className="mb-5 pl-5 text-lg font-bold">
                        {`${locations.length} result${locations.length === 1 ? "" : "s"}`}
                    </div>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        {locations.map((location) => {
                            return (
                                <BreweriesLocationGridBrewery
                                    brewery={location}
                                    key={location.id}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
export default BreweriesLocationFilter;
