import * as z from "zod";

export const BrewerySchema = z.object({
    name: z.string().min(1, {
        message: "Brewery name is required"
    }),
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.optional(z.string()),
    formattedAddress: z.string().min(1, "Formatted address is required"),
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    countryCode: z.optional(z.string()),
    description: z.string().min(1, "Description is required"),
    headline: z.string().min(1, "Headline is required"),
    breweryType: z.string().min(1, "Brewery type is required"),
    website: z.union([z.literal(""), z.string().url()]),
    logoUrl: z
        .array(z.object({ value: z.custom<File>() }))
        .min(1, { message: "Please add at least one image." })
        .max(1, { message: "You can only have one logo" }),
    images: z.array(z.object({ value: z.custom<File>() })).optional()
});

export const BreweryEditSchema = z.object({
    name: z.string().min(1, {
        message: "Brewery name is required"
    }),
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.optional(z.string()),
    formattedAddress: z.string().min(1, "Formatted address is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    countryCode: z.optional(z.string()),
    description: z.string().min(1, "Description is required"),
    headline: z.string().min(1, "Headline is required"),
    breweryType: z.string().min(1, "Brewery type is required"),
    website: z.union([z.literal(""), z.string().url()])
});

export const BrewerySchemaCreate = z.object({
    name: z.string().min(1, {
        message: "Brewery name is required"
    }),
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.optional(z.string()),
    formattedAddress: z.string().min(1, "Formatted address is required"),
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    countryCode: z.optional(z.string()),
    description: z.string().min(1, "Description is required"),
    headline: z.string().min(1, "Headline is required"),
    breweryType: z.string().min(1, "Brewery type is required"),
    website: z.union([z.literal(""), z.string().url()]),
    logoUrl: z.string().min(1, "Brewery logo is required"),
    images: z
        .array(z.object({ order: z.number(), image: z.string() }))
        .optional()
});

export const BreweryLogoSchema = z.object({
    logoUrl: typeof window === "undefined" ? z.any() : z.instanceof(FileList)
});

export const BrewerySearchSchema = z.object({
    search: z.string().min(1, "Query is required")
});

export const BreweryBeersSchema = z.object({
    beers: z.array(z.number().int()).length(2)
});
