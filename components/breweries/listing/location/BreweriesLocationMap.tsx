"use client";

import { useEffect, useState, useRef } from "react";
import mapboxgl, { Map as MapboxMap, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useMapStore } from "@/hooks/useMapStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

// Define the structure for location data
interface Location {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

interface MapProps {
    fetchLocations: (bounds: LngLatBounds) => Promise<Location[]>;
}

const BreweriesLocationMap: React.FC<MapProps> = ({ fetchLocations }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<MapboxMap | null>(null);
    // const [userLocation, setUserLocation] = useState<[number, number] | null>(
    //     null
    // );
    const { setBounds, userLocation, setUserLocation } = useMapStore();

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

    console.log("userLocation", userLocation);

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
            const locations = await fetchLocations(bounds);
            updateMarkers(map, locations);
        };
        fetchData();

        map.on("moveend", fetchData);

        return () => {
            map.off("moveend", fetchData);
        };
    }, [map]);

    const updateMarkers = (mapInstance: MapboxMap, locations: Location[]) => {
        document
            .querySelectorAll(".mapboxgl-marker")
            .forEach((el) => el.remove());

        locations.forEach((location) => {
            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(
                    new mapboxgl.Popup().setHTML(
                        `<h3>${location.name}</h3><p>${location.description}</p>`
                    )
                )
                .addTo(mapInstance);
        });
    };

    return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default BreweriesLocationMap;
