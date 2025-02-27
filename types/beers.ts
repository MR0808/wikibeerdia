import { Status } from "@prisma/client";

export interface BreweriesForm {
    id: string;
    name: string;
}

export interface ParentStylesForm {
    id: string;
    name: string;
}

export interface StylesForm {
    name: string;
    id: string;
}

export interface BeerSubmitSearchParams {
    brewery?: string;
}

export interface BeerType {
    id: string;
    name: string;
    slug: string;
    status: Status;
    description: string;
    abv: string;
    ibu: number | null;
    yearCreated: number | null;
    available: boolean;
    headline: string;
    breweryId: string;
    styleId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        displayName: string | null;
    };
    beerReviews: {
        rating: number;
    }[];
    brewery: {
        id: string;
        name: string;
        slug: string;
        country: {
            name: string;
        };
        logoUrl: string;
        _count: {
            beers: number;
        };
    };
    style: {
        parentStyle: {
            id: string;
            slug: string;
            name: string;
        };
        id: string;
        slug: string;
        name: string;
    } | null;
    images: {
        id: string;
        beerId: string | null;
        order: number;
        image: string;
    }[];
}

export interface BeerPageFilterSearch {
    sort: string;
    page: string;
    pageSize: string;
    search?: string;
    country?: string;
    style?: string;
    brewery?: string;
    abv?: number[];
    ibu?: number[];
    yearCreated?: number[];
    available?: string;
    rating?: number;
}

export interface IdNameFilter {
    id: string;
    name: string;
    count: number;
}

export interface StyleFilter {
    id: string;
    name: string;
    slug: string;
    parentStyleName: string;
}

export interface Filters {
    countries: IdNameFilter[];
    styles: StyleFilter[];
}

export interface Highest {
    abv: string;
    ibu: string;
    yearMax: string;
    yearMin: string;
}

export interface BeersContainerProps {
    beers: BeersListing[] | null;
    total: number;
    filters: Filters | null;
    highest: Highest;
}

export interface BeersGridBeerCountryProps {
    beer: BeerCountryListing;
    brewery: BeerCountryBrewery;
}

export interface BeerCountryBrewery {
    slug: string;
    name: string;
    country: string;
    region: string;
}

export interface BeerCountryListing {
    averageRating: string;
    abv: string;
    style: {
        name: string;
        parentStyle: {
            name: string;
            slug: string;
        };
        id: string;
        slug: string;
    } | null;
    images: {
        id: string;
        image: string;
    }[];
    beerReviews: {
        id: string;
    }[];
    beerFavourites: {
        id: string;
    }[];
    id: string;
    name: string;
    status: Status;
    slug: string;
    description: string;
    headline: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    ibu: number | null;
    yearCreated: number | null;
    available: boolean;
    breweryId: string;
    styleId: string | null;
}

export interface BeersListing {
    averageRating: string;
    abv: string;
    beerReviews: {
        id: string;
    }[];
    beerFavourites: {
        id: string;
    }[];
    images: {
        id: string;
        image: string;
    }[];
    ibu: number | null;
    yearCreated: number | null;
    available: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    status: Status;
    name: string;
    slug: string;
    description: string;
    headline: string;
    breweryId: string;
    styleId: string | null;
    style: {
        name: string;
        parentStyle: {
            name: string;
            slug: string;
        };
        id: string;
        slug: string;
    } | null;
    brewery: {
        country: {
            name: string;
        };
        id: string;
        name: string;
        region: string;
        slug: string;
    };
}

export interface params {
    view: "grid" | "list" | "";
    sort: string;
    page: number;
    pageSize: number;
    search: string;
    country: string;
    style: string;
    brewery: string;
    abv: number[];
    ibu: number[];
    yearCreated: number[];
    available: boolean;
    rating: number;
}

type SetCountry = (newCountry: string[]) => void;
type SetSearch = (newSearch: string) => void;
type SetStyle = (newStyle: string[]) => void;
type SetLetter = (newLetter: string) => void;
type SetPageSize = (newPageSize: number) => void;
type SetPage = (newPage: number) => void;
type SetSort = (
    newSort: "" | "az" | "za" | "newest" | "oldest" | "popular"
) => void;
type setAvailable = (newAvailable: "" | "true" | "false") => void;
type SetRating = (newRating: number) => void;
type setStyle = (newStyle: string[]) => void;
type setBrewery = (newBrewery: string[]) => void;
type setAbv = (newAbv: number[]) => void;
type setIbu = (newIbu: number[]) => void;
type setYearCreated = (newYearCreated: number[]) => void;
type View = "grid" | "list" | "";

export interface BeersFilterProps {
    filters: Filters | null;
    country: string[];
    setCountry: SetCountry;
    search: string;
    setSearch: SetSearch;
    style: string[];
    setStyle: SetStyle;
    abv: number[];
    setAbv: setAbv;
    ibu: number[];
    setIbu: setIbu;
    brewery: string[];
    setBrewery: setBrewery;
    yearCreated: number[];
    setYearCreated: setYearCreated;
    available: string;
    setAvailable: setAvailable;
    rating: number;
    setRating: SetRating;
    isPending: boolean;
    highest: Highest;
}

export interface BeersFilterBreweriesProps {
    brewery: string[];
    setBrewery: setBrewery;
}

export interface BeersFilterIbuProps {
    ibu: number[];
    setIbu: setIbu;
    highestIbu: number;
}

export interface BeersFilterAbvProps {
    abv: number[];
    setAbv: setAbv;
    highestAbv: number;
}

export interface BeersFilterYearProps {
    yearCreated: number[];
    setYearCreated: setYearCreated;
    highestYear: number;
    lowestYear: number;
}

export interface BeersFilterSearchProps {
    search: string;
    setSearch: SetSearch;
}

export interface BeersFilterCountryProps {
    country: string[];
    setCountry: SetCountry;
    countries: IdNameFilter[];
}

export interface BeersFilterStyleProps {
    style: string[];
    setStyle: SetStyle;
    styles: StyleFilter[];
}

export interface BeersFilterRatingProps {
    rating: number;
    setRating: SetRating;
}

export interface BeersFilterAvailableProps {
    available: string;
    setAvailable: setAvailable;
}

export interface BeersListingsProps {
    beers: BeersListing[] | null;
    total: number;
    country: string[];
    setCountry: SetCountry;
    search: string;
    setSearch: SetSearch;
    style: string[];
    setStyle: SetStyle;
    brewery: string[];
    setBrewery: setBrewery;
    abv: number[];
    setAbv: setAbv;
    ibu: number[];
    setIbu: setIbu;
    yearCreated: number[];
    setYearCreated: setYearCreated;
    available: string;
    setAvailable: setAvailable;
    rating: number;
    setRating: SetRating;
    pageSize: number;
    setPageSize: SetPageSize;
    page: number;
    setPage: SetPage;
    sort: string;
    setSort: SetSort;
    view: View;
    isPending: boolean;
}

export interface BeersViewToggleProps {
    paramsView: string;
}

export interface Option {
    value: string;
    name: string;
}

export interface BeersSortSelectProps {
    sortOrders: { value: string; name: string }[];
    sort: string;
    setSort: SetSort;
}

export interface BeersResultsProps {
    beers: BeersListing[] | null;
    country: string[];
    setCountry: SetCountry;
    search: string;
    setSearch: SetSearch;
    style: string[];
    setStyle: SetStyle;
    brewery: string[];
    setBrewery: setBrewery;
    abv: number[];
    setAbv: setAbv;
    ibu: number[];
    setIbu: setIbu;
    yearCreated: number[];
    setYearCreated: setYearCreated;
    available: string;
    setAvailable: setAvailable;
    rating: number;
    setRating: SetRating;
    isPending: boolean;
}

export type BreweriesResult = { name: string; slug: string };

export interface BeersAZAlphabetProps {
    letter: string;
}

export interface BeersAZContainerProps {
    total: number;
    letter: string;
}

export interface AZparams {
    pageSize: number;
    page: number;
    view: "grid" | "list" | "";
    letter: string;
}

export interface BeerAZPageSearch {
    page: number;
    letter?: string;
}

export interface BeersAZAlphabetProps {
    letter: string;
}

export interface BeersAZViewToggleProps {
    paramsView: string;
}

export interface ParentStyles {
    id: string;
    slug: string;
    name: string;
}

export interface Styles {
    id: string;
    slug: string;
    name: string;
}

export interface BeersStylesParentsListingProps {
    parentStyles: ParentStyles[];
}

export interface BeerStylePageSearch {
    page: number;
    style?: string[];
}

export interface MultiSelect {
    parent?: string;
    value: string;
    label: string;
}
