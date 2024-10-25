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
    images: {
        id: string;
        image: string;
        order: number;
        breweryId: string;
    }[];
    beers: {
        id: string;
        name: string;
        images: {
            id: string;
            image: string;
            order: number;
            beerId: string | null;
        }[];
        abv: string;
        subStyle: {
            name: string;
        } | null;
    }[];
    breweryReviews: {
        id: string;
        status: Status;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        breweryId: string;
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
    country: {
        id: string;
        name: string;
        isoCode: string;
        currency: string;
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
