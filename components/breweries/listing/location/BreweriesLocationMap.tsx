"use client";

import { useEffect, useState, useRef } from "react";
import mapboxgl, { Map as MapboxMap, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import Link from "next/link";
import { Beer, Star } from "lucide-react";
import ReactDOM from "react-dom/client";

import { useMapStore } from "@/hooks/useMapStore";
import { BreweriesListing } from "@/types/breweries";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const PopupComponent = ({ brewery }: { brewery: BreweriesListing }) => (
    <div className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5">
        <div
            className="w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
            style={{
                backgroundColor: brewery.breweryType.colour
            }}
        >
            {brewery.breweryType.name}
        </div>
        <div className="flex flex-col space-y-4">
            <Link
                href={`/breweries/${brewery.slug}`}
                className="hover:text-primary cursor-pointer text-2xl font-semibold"
            >
                {brewery.name}
            </Link>
            <div className="text-foreground/55 text-lg">
                {`${brewery.region}, ${brewery.country.name}`}
            </div>
        </div>
        <div className="text-foreground/60 w-full border-t border-dashed border-t-gray-300 pt-4 text-xl">
            <ul className="flex list-none flex-wrap items-center justify-between">
                <li className="flex flex-row items-center">
                    <Beer className="mr-2 size-5" />
                    {`${brewery._count.beers} beer${brewery._count.beers !== 1 && "s"}`}
                </li>
                <li className="flex flex-row items-center">
                    <Star className="mr-2 size-5" />
                    {`${Number.parseFloat(brewery.averageRating).toFixed(
                        2
                    )} (${brewery.breweryReviews.length})`}
                </li>
            </ul>
        </div>
    </div>
);

interface MapProps {
    fetchLocations: (
        bounds: LngLatBounds,
        breweryType: string
    ) => Promise<BreweriesListing[]>;
}

const BreweriesLocationMap: React.FC<MapProps> = ({ fetchLocations }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<MapboxMap | null>(null);
    const [locationsTemp, setLocationsTemp] = useState<
        BreweriesListing[] | null
    >(null);
    // const [userLocation, setUserLocation] = useState<[number, number] | null>(
    //     null
    // );
    const { setBounds, userLocation, setUserLocation, breweryType } =
        useMapStore();

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([longitude, latitude]);
            },
            () => {
                console.error("Error getting location");
            }
        );
    }, []);

    useEffect(() => {
        if (!mapContainerRef.current || !userLocation) return;

        const initializeMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: userLocation,
            zoom: 12
        });

        initializeMap.on("load", () => {
            setMap(initializeMap);
        });

        return () => initializeMap.remove();
    }, [userLocation]);

    useEffect(() => {
        if (!map) return;

        const fetchData = async () => {
            if (!map) return;
            const bounds = map.getBounds();
            if (!bounds) return; // Ensure bounds is not null before calling fetchLocations
            setBounds([
                bounds.getWest(),
                bounds.getSouth(),
                bounds.getEast(),
                bounds.getNorth()
            ]);
            const locations = await fetchLocations(bounds, breweryType);
            setLocationsTemp(locations);
            let filteredData = locations;
            if (breweryType !== "all")
                filteredData = locations.filter(
                    (item) => item.breweryTypeId === breweryType
                );
            // const locations = await fetchLocations(bounds, breweryType);
            updateMarkers(map, filteredData);
        };
        fetchData();

        map.on("moveend", fetchData);

        return () => {
            map.off("moveend", fetchData);
        };
    }, [map]);

    useEffect(() => {
        if (locationsTemp && map) {
            let filteredData = locationsTemp;
            if (breweryType !== "all")
                filteredData = locationsTemp.filter(
                    (item) => item.breweryTypeId === breweryType
                );
            updateMarkers(map, filteredData);
        }
    }, [breweryType]);

    const updateMarkers = (
        mapInstance: MapboxMap,
        locations: BreweriesListing[]
    ) => {
        if (mapInstance && locations) {
            document
                .querySelectorAll(".mapboxgl-marker")
                .forEach((el) => el.remove());

            locations.forEach((location) => {
                const popupContainer = document.createElement("div");
                ReactDOM.createRoot(popupContainer).render(
                    <PopupComponent brewery={location} />
                );

                new mapboxgl.Marker()
                    .setLngLat([location.longitude, location.latitude])
                    .setPopup(
                        new mapboxgl.Popup().setDOMContent(popupContainer)
                    )
                    .addTo(mapInstance);
            });
        }
    };

    return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default BreweriesLocationMap;
