"use client";

import { useEffect, useState, useRef } from "react";
import mapboxgl, { Map as MapboxMap, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom/client";

import { useEnv } from "@/hooks/useEnv";
import { useMapStore } from "@/hooks/useMapStore";
import { BreweriesListing } from "@/types/breweries";
import BreweriesLocationPopup from "./BreweriesLocationPopup";

interface MapProps {
    fetchLocations: (
        bounds: LngLatBounds,
        breweryType: string
    ) => Promise<BreweriesListing[]>;
}

const BreweriesLocationMap: React.FC<MapProps> = ({ fetchLocations }) => {
    const { envVars, loading, error } = useEnv();
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<MapboxMap | null>(null);
    const [locationsTemp, setLocationsTemp] = useState<
        BreweriesListing[] | null
    >(null);
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
        if (
            !mapContainerRef.current ||
            !userLocation ||
            !envVars?.MAPBOX_ACCESS_TOKEN
        )
            return;

        mapboxgl.accessToken = envVars.MAPBOX_ACCESS_TOKEN;

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
    }, [userLocation, envVars]);

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
            try {
                const locations = await fetchLocations(bounds, breweryType);
                setLocationsTemp(locations);
                let filteredData = locations;
                if (breweryType !== "all")
                    filteredData = locations.filter(
                        (item) => item.breweryTypeId === breweryType
                    );
                // const locations = await fetchLocations(bounds, breweryType);
                updateMarkers(map, filteredData);
            } catch (err) {
                console.error("Error fetching locations:", err);
            }
        };
        fetchData();

        map.on("moveend", fetchData);

        return () => {
            map.off("moveend", fetchData);
        };
    }, [map, breweryType]);

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
        if (!mapInstance || !locations || !mapInstance.getCanvasContainer()) {
            return;
        }
        document
            .querySelectorAll(".mapboxgl-marker")
            .forEach((el) => el.remove());

        locations.forEach((location) => {
            const popupContainer = document.createElement("div");

            setTimeout(() => {
                ReactDOM.createRoot(popupContainer).render(
                    <BreweriesLocationPopup brewery={location} />
                );
            }, 0);

            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(new mapboxgl.Popup().setDOMContent(popupContainer))
                .addTo(mapInstance);
        });
    };

    return (
        <>
            {loading && <p>Loading environment variables...</p>}
            {error && <p>Error: {error}</p>}
            {!envVars && !loading && <p>No environment variables found</p>}
            <div ref={mapContainerRef} className="h-full w-full" />
        </>
    );
};

export default BreweriesLocationMap;
