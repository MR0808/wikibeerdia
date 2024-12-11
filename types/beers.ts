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
    subStyles: {
        name: string;
        id: string;
    }[];
}

export interface BeerSubmitSearchParams {
    brewery?: string;
}

export interface BeerType {
    id: string;
    name: string;
    status: Status;
    description: string;
    abv: string;
    ibu: string | null;
    yearCreated: number | null;
    available: boolean;
    headline: string;
    breweryId: string;
    subStyleId: string | null;
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
        country: {
            name: string;
        };
        logoUrl: string;
    };
    subStyle: {
        id: string;
        name: string;
        style: {
            id: string;
            name: string;
            parentStyle: {
                id: string;
                name: string;
            };
        };
    } | null;
    images: {
        id: string;
        beerId: string | null;
        order: number;
        image: string;
    }[];
}
