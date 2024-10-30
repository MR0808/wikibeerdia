import { Status } from "@prisma/client";

export interface BreweryType {
    id: string;
    name: string;
    status: Status;
    address1: string;
    address2: string | null;
    city: string;
    region: string;
    postalCode: string;
    countryId: string;
    formattedAddress: string;
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

export interface BreweryReviewsType {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
        id: string;
        displayName: string | null;
        image: string | null;
    };
}

export interface BreweryBeersType {
    id: string;
    name: string;
    abv: string;
    subStyle: {
        name: string;
    } | null;
    images: {
        id: string;
        order: number;
        image: string;
        beerId: string | null;
    }[];
}
