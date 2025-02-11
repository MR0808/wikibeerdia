import { create } from "zustand";
import { LngLatLike, LngLatBounds } from "mapbox-gl";

interface MapBoundsState {
    bounds: LngLatBounds | null;
    setBounds: (
        bounds: [number, number, number, number] | [LngLatLike, LngLatLike]
    ) => void;
    userLocation: [number, number] | null;
    setUserLocation: (userLocation: [number, number] | null) => void;
}

export const useMapStore = create<MapBoundsState>((set) => ({
    bounds: null,
    setBounds: (bounds) => set({ bounds: new LngLatBounds(bounds) }),
    userLocation: null,
    setUserLocation: (userLocation) => set({ userLocation })
}));
