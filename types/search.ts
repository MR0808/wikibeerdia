import { getSearchResults } from "@/actions/search";

export interface SearchFilter {
    sort: string;
    page: number;
    pageSize: number;
    query?: string;
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
}

export interface SearchContainerProps {
    results: FullResults | null;
}

type View = "grid" | "list" | "";
type SetPageSize = (newPageSize: number) => void;
type SetPage = (newPage: number) => void;
type SetBeers = (newBeers: number[]) => void;
type SetSort = (
    newSort: "" | "az" | "za" | "newest" | "oldest" | "popular"
) => void;
type setQuery = (newQuery: string) => void;

export interface SearchListingProps {
    results: FullResults | null;
    query: string;
    setQuery: setQuery;
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
    setQuery: setQuery;
    nuqsView: View;
    isPending: boolean;
}

export interface SearchFilterProps {
    query: string;
    setQuery: setQuery;
    isPending: boolean;
}

export interface SearchFilterSearchProps {
    query: string;
    setQuery: setQuery;
}
