import { create } from "zustand";
import { BreweriesResult } from "@/types/beers";

interface BreweryFilterState {
    breweryList: BreweriesResult[];
    setBreweryList: (breweryList: BreweriesResult[]) => void;
}

export const useBreweryFilterStore = create<BreweryFilterState>((set) => ({
    breweryList: [],
    setBreweryList: (breweryList) => set({ breweryList })
}));
