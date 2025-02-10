import { create } from "zustand";
import { LngLatLike, LngLatBounds } from "mapbox-gl";

interface MapBoundsState {
    bounds: LngLatBounds | null;
    setBounds: (
        bounds: [number, number, number, number] | [LngLatLike, LngLatLike]
    ) => void;
    extendBounds: (lngLat: LngLatLike) => void;
    resetBounds: () => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useMapStore = create<MapBoundsState>((set) => ({
    bounds: null,

    setBounds: (bounds) => set({ bounds: new LngLatBounds(bounds) }),

    extendBounds: (lngLat) =>
        set((state) => {
            if (state.bounds) {
                const updatedBounds = state.bounds.extend(lngLat);
                return { bounds: updatedBounds };
            }
            return { bounds: new LngLatBounds(lngLat, lngLat) }; // Ensure it starts with a valid pair
        }),

    resetBounds: () => set({ bounds: null }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading })
}));
