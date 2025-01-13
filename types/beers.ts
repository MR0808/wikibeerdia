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
    ibu: string | null;
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
        name: string;
        parentStyle: {
            name: string;
            id: string;
        };
        id: string;
    } | null;
    images: {
        id: string;
        beerId: string | null;
        order: number;
        image: string;
    }[];
}
