"use client";

import { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

interface GoogleMapsContextType {
    isLoaded: boolean;
    loadError: Error | undefined;
}

// Create a context
const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(
    undefined
);

// GoogleMapsProvider Component
export const GoogleMapsProvider = ({
    apiKey,
    children
}: {
    apiKey: string;
    children: React.ReactNode;
}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries
    });

    return (
        <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

// Custom hook to use Google Maps context
export const useGoogleMaps = () => {
    const context = useContext(GoogleMapsContext);
    if (!context) {
        throw new Error(
            "useGoogleMaps must be used within a GoogleMapsProvider"
        );
    }
    return context;
};
