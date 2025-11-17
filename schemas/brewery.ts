// --------------------------------------------------------
// BREWERY SCHEMAS (Zod 4 Safe)
// --------------------------------------------------------

import * as z from "zod";
import {
    stringRequired,
    numberRequired,
    fileObjectArray,
    coercedNumber,
    urlOrEmpty
} from "@/schemas/helpers";

// --------------------------------------------------------
// Base fields for all Brewery schemas
// --------------------------------------------------------

const breweryBaseFields = {
    name: stringRequired("Brewery name is required"),
    address1: stringRequired("Address line 1 is required"),
    address2: z.string().optional(),

    formattedAddress: stringRequired("Formatted address is required"),

    latitude: numberRequired("Latitude is required"),
    longitude: numberRequired("Longitude is required"),

    city: stringRequired("City is required"),
    region: stringRequired("Region is required"),
    postalCode: stringRequired("Postal code is required"),
    country: stringRequired("Country is required"),
    countryCode: z.string().optional(),

    description: stringRequired("Description is required"),
    headline: stringRequired("Headline is required"),

    breweryType: stringRequired("Brewery type is required"),

    website: urlOrEmpty()
};

// --------------------------------------------------------
// 1. BrewerySchema
// --------------------------------------------------------

export const BrewerySchema = z.object({
    ...breweryBaseFields,

    logoUrl: fileObjectArray()
        .min(1, "Please add at least one image.")
        .max(1, "You can only have one logo"),

    images: fileObjectArray().optional()
});

// --------------------------------------------------------
// 2. BreweryEditSchema
// --------------------------------------------------------

export const BreweryEditSchema = z.object({
    ...breweryBaseFields
});

// --------------------------------------------------------
// 3. BrewerySchemaCreate
// --------------------------------------------------------

export const BrewerySchemaCreate = z.object({
    ...breweryBaseFields,

    logoUrl: stringRequired("Brewery logo is required"),

    images: z
        .array(
            z.object({
                order: coercedNumber(z.number()),
                image: z.string()
            })
        )
        .optional()
});

// --------------------------------------------------------
// 4. BreweryLogoSchema
// --------------------------------------------------------

export const BreweryLogoSchema = z.object({
    logoUrl: typeof window === "undefined" ? z.any() : z.instanceof(FileList)
});

// --------------------------------------------------------
// 5. BrewerySearchSchema
// --------------------------------------------------------

export const BrewerySearchSchema = z.object({
    search: stringRequired("Query is required")
});

// --------------------------------------------------------
// 6. BreweryBeersSchema (Two integers)
// --------------------------------------------------------

export const BreweryBeersSchema = z.object({
    beers: z.array(coercedNumber(z.number().int())).length(2)
});
