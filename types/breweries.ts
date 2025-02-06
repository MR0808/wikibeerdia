import { Status } from "@prisma/client";

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
    averageRating: string;
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
}

export interface BreweriesListingsProps {
    breweries: BreweriesListing[] | null;
    total: number;
    params: params;
    setCountry: (newCountry: string[]) => void
    setSearch: (newSearch: string) => void
    setType: (newType: string) => void
    setPageSize: (newPageSize: number) => void
    setPage: (newPage: number) => void
    setSort: (newSort: "" | "az" | "za" | "newest" | "oldest" | "popular") => void
    country: string[]
    search: string
    type: string
    pageSize: number
    page: number
    sort: NonNullable<"" | "az" | "za" | "newest" | "oldest" | "popular" | null>
    isPending: boolean
}


export interface BreweriesFilterProps {
    params: params;
    filters: Filters | null
    setCountry: (newCountry: string[]) => void
    setSearch: (newSearch: string) => void
    setType: (newType: string) => void
    nuqsCountry: string[]
    search: string
    type: string
    isPending: boolean
}

export interface BreweriesResultsProps {
    breweries: BreweriesListing[] | null;
    params: params
    setCountry: (newCountry: string[]) => void
    setSearch: (newSearch: string) => void
    setType: (newType: string) => void
    country: string[]
    search: string
    type: string
    isPending: boolean
}

export interface BreweriesListing {
    breweryType: {
        id: string;
        name: string;
        colour: string
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
};

export interface params {
    pageSize: number;
    page: number;
    view: 'grid' | 'list' | '';
    sort: string;
    search: string;
    country: string;
    type: string
}

export interface Option {
    value: string;
    name: string;
}

export interface BreweriesSortSelectProps {
    sortOrders: { value: string; name: string }[];
    sort: string;
    setSort: (newSort: "" | "az" | "za" | "newest" | "oldest" | "popular") => void
};

export interface BreweriesViewToggleProps {
    paramsView: string
};

export interface BeersCountFilter {
    beerCount: number, occurrences: number
}

export interface IdNameFilter {
    id: string
    name: string
    count: number
}

export interface Filters {
    countries: IdNameFilter[]
    breweryTypes: IdNameFilter[]
    beersCount: BeersCountFilter[]
}

export interface BreweryPageFilterSearch {
    sort: string
    page: string
    pageSize: string
    search?: string
    country?: string
}