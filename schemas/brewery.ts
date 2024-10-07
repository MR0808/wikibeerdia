import * as z from "zod";

export const BrewerySchema = z.object({
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
    description: z.string().min(1, "Description is required"),
    breweryType: z.string().min(1, "Brewery type is required"),
    website: z.optional(z.string().url())
});

// z.string().url().or(z.literal(""));
