import { create } from "zustand";
import { BreweriesResult, StyleFilter } from "@/types/beers";

interface BreweryFilterState {
    breweryList: BreweriesResult[];
    setBreweryList: (breweryList: BreweriesResult[]) => void;
    stylesList: StyleFilter[];
    setStylesList: (styleList: StyleFilter[]) => void;
}

export const useBreweryFilterStore = create<BreweryFilterState>((set) => ({
    breweryList: [],
    setBreweryList: (breweryList) => set({ breweryList }),
    stylesList: [],
    setStylesList: (stylesList) => set({ stylesList })
}));
