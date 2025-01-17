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

export interface BreweriesListingsProps {
    breweries: BreweriesListing[] | null;
    total: number;
}

export interface BreweriesListing {
    breweryType: {
        id: string;
        name: string;
        colour: string
    };
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
    description: string;
    website: string;
    logoUrl: string;
    headline: string;
    breweryTypeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
