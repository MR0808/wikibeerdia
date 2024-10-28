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
        id: string;
        breweryId: string;
        status: Status;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string | null;
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

export interface BreweryTypeReviews {
    id: string;
    status: Status;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    breweryId: string;
    rating: number;
    comment: string | null;
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
