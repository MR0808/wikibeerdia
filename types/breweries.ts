import { Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface BreweryType {
    id: string;
    name: string;
    slug: string;
    status: Status;
    address1: string;
    address2: string | null;
    city: string;
    region: string;
    postalCode: string;
    countryId: string;
    formattedAddress: string;
    averageRatingString: string;
    description: string;
    headline: string;
    website: string;
    logoUrl: string;
    breweryTypeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    country: {
        id: string;
        name: string;
        isoCode: string;
        currency: string;
    };
    images: {
        id: string;
        order: number;
        image: string;
        breweryId: string | null;
    }[];
    breweryReviews: {
        rating: number;
    }[];
    breweryType: {
        name: string;
    };
    user: {
        id: string;
        displayName: string | null;
    };
    _count: {
        beers: number;
    };
}

export interface BreweryBeersType {
    id: string;
    slug: string;
    name: string;
    abv: string;
    style: {
        name: string;
    } | null;
    images: {
        id: string;
        order: number;
        image: string;
        beerId: string | null;
    }[];
}

export interface BreweriesContainerProps {
    breweries: BreweriesListing[] | null;
    total: number;
    params: params;
    filters: Filters | null;
    highestBeers: number;
}

type SetCountry = (newCountry: string[]) => void;
type SetSearch = (newSearch: string) => void;
type SetType = (newType: string[]) => void;
type SetLetter = (newLetter: string) => void;
type SetPageSize = (newPageSize: number) => void;
type SetPage = (newPage: number) => void;
type SetBeers = (newBeers: number[]) => void;
type SetSort = (
    newSort: "" | "az" | "za" | "newest" | "oldest" | "popular"
) => void;
type SetRating = (newRating: number) => void;
type View = "grid" | "list" | "";

export interface BreweriesListingsProps {
    breweries: BreweriesListing[] | null;
    total: number;
    params: params;
    country: string[];
    setCountry: SetCountry;
    search: string;
    setSearch: SetSearch;
    type: string[];
    setType: SetType;
    beers: number[];
    setBeers: SetBeers;
    rating: number;
    setRating: SetRating;
    setPageSize: SetPageSize;
    setPage: SetPage;
    setSort: SetSort;
    view: View;
    isPending: boolean;
}

export interface BreweriesFilterProps {
    params: params;
    filters: Filters | null;
    country: string[];
    setCountry: SetCountry;
    search: string;
    setSearch: SetSearch;
    type: string[];
    setType: SetType;
    beers: number[];
    setBeers: SetBeers;
    rating: number;
    setRating: SetRating;
    isPending: boolean;
    highestBeers: number;
}

export interface BreweriesResultsProps {
    breweries: BreweriesListing[] | null;
    params: params;
    country: string[];
    setCountry: SetCountry;
    search: string;
    setSearch: SetSearch;
    type: string[];
    setType: SetType;
    beers: number[];
    setBeers: SetBeers;
    rating: number;
    setRating: SetRating;

    isPending: boolean;
}

export interface BreweriesListing {
    breweryType: {
        id: string;
        name: string;
        colour: string;
    };
    breweryFavourites: {
        id: string;
    }[];
    _count: {
        beers: number;
    };
    images: {
        id: string;
        image: string;
    }[];
    country: {
        name: string;
        id: string;
    };
    breweryReviews: {
        id: string;
    }[];
    name: string;
    city: string;
    status: Status;
    id: string;
    slug: string;
    address1: string;
    address2: string | null;
    region: string;
    postalCode: string;
    countryId: string;
    formattedAddress: string;
    averageRating: string;
    description: string;
    website: string;
    logoUrl: string;
    headline: string;
    breweryTypeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    latitude: number;
    longitude: number;
}

export interface BreweryListing {
    breweryType: {
        id: string;
        name: string;
        colour: string;
    };
    breweryFavourites: {
        id: string;
    }[];
    _count: {
        beers: number;
    };
    images: {
        id: string;
        image: string;
    }[];
    country: {
        name: string;
        id: string;
    };
    breweryReviews: {
        id: string;
    }[];
    name: string;
    city: string;
    status: Status;
    id: string;
    slug: string;
    address1: string;
    address2: string | null;
    region: string;
    postalCode: string;
    countryId: string;
    formattedAddress: string;
    averageRating: string;
    description: string;
    website: string;
    logoUrl: string;
    headline: string;
    breweryTypeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface params {
    pageSize: number;
    page: number;
    view: "grid" | "list" | "";
    sort: string;
    search: string;
    country: string;
    type: string;
    beers: number[];
}

export interface Option {
    value: string;
    name: string;
}

export interface BreweriesSortSelectProps {
    sortOrders: { value: string; name: string }[];
    sort: string;
    setSort: SetSort;
}

export interface BreweriesViewToggleProps {
    paramsView: string;
}

export interface BeersCountFilter {
    beerCount: number;
    occurrences: number;
}

export interface IdNameFilter {
    id: string;
    name: string;
    count: number;
}

export interface Filters {
    countries: IdNameFilter[];
    breweryTypes: IdNameFilter[];
}

export interface BreweryPageFilterSearch {
    sort: string;
    page: string;
    pageSize: string;
    search?: string;
    country?: string;
    type?: string;
    beers?: number[];
    rating?: number;
}

export interface BreweriesAZContainerProps {
    total: number;
    letter: string;
}

export interface AZparams {
    pageSize: number;
    page: number;
    view: "grid" | "list" | "";
    letter: string;
}

export interface BreweryAZPageSearch {
    page: number;
    letter?: string;
}

export interface BreweriesAZAlphabetProps {
    letter: string;
}
