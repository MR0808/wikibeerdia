import * as z from "zod";
import { zfd } from "zod-form-data";

// export const BrewerySchema = z.object({
//     name: z.string().min(1, {
//         message: "Brewery name is required"
//     }),
//     address1: z.string().min(1, "Address line 1 is required"),
//     address2: z.optional(z.string()),
//     formattedAddress: z.string().min(1, "Formatted address is required"),
//     city: z.string().min(1, "City is required"),
//     region: z.string().min(1, "Region is required"),
//     postalCode: z.string().min(1, "Postal code is required"),
//     country: z.string().min(1, "Country is required"),
//     countryCode: z.optional(z.string()),
//     description: z.string().min(1, "Description is required"),
//     breweryType: z.string().min(1, "Brewery type is required"),
//     website: z.union([z.literal(""), z.string().url()]),
//     logoUrl: z
//         .array(z.object({ value: z.custom<File>() }))
//         .min(1, { message: "Please add at least one image." }),
//     images: z.array(z.object({ value: z.custom<File>() })).optional()
// });

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
    countryCode: z.optional(z.string()),
    description: z.string().min(1, "Description is required"),
    breweryType: z.string().min(1, "Brewery type is required"),
    website: z.union([z.literal(""), z.string().url()]),
    logoUrl: z
        .array(z.object({ value: z.custom<File>() }))
        .min(1, { message: "Please add at least one image." })
        .max(1, { message: "You can only nhave one logo" }),
    images: z.array(z.object({ value: z.custom<File>() })).optional()
});

export const BrewerySchemaFormData = zfd.formData({
    name: zfd.text(),
    address1: zfd.text(),
    address2: zfd.text(z.string().optional()),
    formattedAddress: zfd.text(),
    city: zfd.text(),
    region: zfd.text(),
    postalCode: zfd.text(),
    country: zfd.text(),
    countryCode: zfd.text(),
    description: zfd.text(),
    breweryType: zfd.text(),
    website: zfd.text(z.string().optional()),
    logoUrl: zfd.repeatable(z.array(zfd.file()).min(1)),
    images: zfd.repeatable(z.array(zfd.file()).optional())
});
