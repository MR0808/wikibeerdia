import * as z from "zod";
import { Status } from "@prisma/client";

import {
    typesSearchParamsSchema,
    SearchParamsSchema,
    breweriesSearchParamsSchema
} from "@/schemas/admin";

export type GetTypesSchema = z.infer<typeof typesSearchParamsSchema>;

export type GetBreweriesSchema = z.infer<typeof breweriesSearchParamsSchema>;

export type GetSearchSchema = z.infer<typeof SearchParamsSchema>;

export type Brewery = {
    name: string;
    status: Status;
    city: string;
    id: string;
    slug: string;
    address1: string;
    address2: string | null;
    region: string;
    postalCode: string;
    countryId: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
    description: string;
    website: string;
    logoUrl: string;
    headline: string;
    averageRating: string;
    beerCount: number;
    breweryTypeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
