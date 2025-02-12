"use client";

import { useRef, useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

import { Input } from "@/components/ui/input";
import { useMapStore } from "@/hooks/useMapStore";
import { useGoogleMaps } from "@/Providers/GoogleMapsProvider";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const BreweriesLocationSearch = ({
    types
}: {
    types: {
        data: {
            id: string;
            name: string;
        }[];
    };
}) => {
    const { isLoaded, loadError } = useGoogleMaps();
    const { userLocation, setUserLocation, breweryType, setBreweryType } =
        useMapStore();
    const [search, setSearch] = useState("");
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    const onPlaceChanged = () => {
        if (!autocompleteRef.current) return;

        const place = autocompleteRef.current.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const location = place.geometry.location as google.maps.LatLng;
        setUserLocation([location.lng(), location.lat()]);
        setSearch(place.formatted_address || "");
    };

    const onBreweryTypeChange = (value: string) => {
        setBreweryType(value);
    };

    if (loadError) return <p>Error loading Google Maps</p>;
    if (!isLoaded) return <p>Loading Google Maps...</p>;

    return (
        <div className="mb-5 flex w-full flex-row space-x-10 rounded-4xl bg-gray-100 p-4">
            <Autocomplete
                onLoad={(auto) => {
                    autocompleteRef.current = auto;
                    // Set location bias if user location is available
                    if (userLocation) {
                        auto.setBounds(
                            new google.maps.LatLngBounds(
                                new google.maps.LatLng(
                                    userLocation[0],
                                    userLocation[1]
                                )
                            )
                        );
                    }
                }}
                onPlaceChanged={onPlaceChanged}
                options={{
                    bounds: userLocation
                        ? new google.maps.LatLngBounds(
                              new google.maps.LatLng(
                                  userLocation[0],
                                  userLocation[1]
                              )
                          )
                        : undefined
                }}
                className={cn("w-3/5")}
            >
                <Input
                    placeholder="Enter a location..."
                    defaultValue={search}
                    className={cn("w-full")}
                />
            </Autocomplete>
            <Select
                onValueChange={onBreweryTypeChange}
                defaultValue={breweryType}
            >
                <SelectTrigger className="w-2/5">
                    <SelectValue placeholder="Select a brewery type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {types.data.map((type) => {
                        return (
                            <SelectItem value={type.id} key={type.id}>
                                {type.name}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
};
export default BreweriesLocationSearch;
