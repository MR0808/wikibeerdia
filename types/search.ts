import { getSearchResults } from "@/actions/search";

export interface SearchFilter {
    sort: string;
    page: number;
    pageSize: number;
    query?: string;
    type: "all" | "beers" | "breweries";
    country?: string;
    rating?: number;
}

export type FullResults = Awaited<ReturnType<typeof getSearchResults>>;

export interface Results {
    type: string;
    id: string;
    slug: string;
    name: string;
    parentStyleSlug?: string | undefined;
    styleSlug?: string | undefined;
    style?: string | undefined;
    favouritesId: string;
    image?: string;
    available?: boolean;
    brewerySlug?: string;
    breweryName?: string;
    region: string;
    country: string;
    countryId: string;
    averageRating: string;
    abv?: string;
    ibu?: number | null;
    yearCreated?: number | null;
    reviewsLength?: number;
    breweryTypeName?: string;
    breweryTypeSlug?: string;
    breweryTypeColour?: string;
    logoUrl?: string;
    beerCount?: number;
    createdAt: Date;
}

export interface SearchContainerProps {
    results: FullResults | null;
}

type View = "grid" | "list" | "";
export type Type = "all" | "beers" | "breweries";
type SetPageSize = (newPageSize: number) => void;
type SetPage = (newPage: number) => void;
type SetSort = (
    newSort: "" | "az" | "za" | "newest" | "oldest" | "popular"
) => void;
type SetType = (newType: "all" | "beers" | "breweries") => void;
type SetQuery = (newQuery: string) => void;
type SetRating = (newRating: number) => void;
type SetCountry = (newCountry: string[]) => void;

export interface SearchListingProps {
    results: FullResults | null;
    query: string;
    setQuery: SetQuery;
    type: Type;
    setType: SetType;
    country: string[];
    setCountry: SetCountry;
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

export interface Option {
    value: string;
    name: string;
}

export interface SearchSortSelectProps {
    sortOrders: { value: string; name: string }[];
    sort: string;
    setSort: SetSort;
}

export interface SearchViewToggleProps {
    paramsView: string;
}

export interface SearchResultsProps {
    results: Results[] | null;
    query: string;
    setQuery: SetQuery;
    type: Type;
    setType: SetType;
    country: string[];
    setCountry: SetCountry;
    rating: number;
    setRating: SetRating;
    nuqsView: View;
    isPending: boolean;
}

export interface SearchFilterProps {
    countries: IdNameFilter[];
    query: string;
    setQuery: SetQuery;
    type: Type;
    setType: SetType;
    country: string[];
    setCountry: SetCountry;
    rating: number;
    setRating: SetRating;
    isPending: boolean;
}

export interface SearchFilterSearchProps {
    query: string;
    setQuery: SetQuery;
}

export interface SearchFilterTypeProps {
    type: Type;
    setType: SetType;
}

export interface SearchFilterRatingProps {
    rating: number;
    setRating: SetRating;
}

export interface IdNameFilter {
    id: string;
    name: string;
    count: number;
}

export interface SearchFilterCountryProps {
    country: string[];
    setCountry: SetCountry;
    countries: IdNameFilter[];
}
