export interface SearchFilter {
    sort: string;
    page: number;
    pageSize: number;
    query?: string;
}

type MergedResult = {
    id: string;
    name: string;
    description?: string;
    headline?: string;
    images?: { id: string; image: string }[];
    beerReviews?: { id: string }[];
    beerFavourites?: { id: string }[];
    style?: {
        id: string;
        name: string;
        slug: string;
        parentStyle?: { slug: string; name: string };
    };
    brewery?: {
        id: string;
        name: string;
        region: string;
        country: { name: string };
        slug: string;
    };
    _count?: { beers: number };
    breweryType?: {
        id: string;
        name: string;
        colour: string;
        slug: string;
    };
    country?: { id: string; name: string };
    breweryReviews?: { id: string }[];
    breweryFavourites?: { id: string }[];
    type: "beer" | "brewery";
};
