import * as z from "zod";

export const BeerSchema = z.object({
    name: z.string().min(1, {
        message: "Beer name is required"
    }),
    headline: z.string().min(1, {
        message: "Headline is required"
    }),
    description: z.string().min(1, "Description is required"),
    abv: z.number({
        required_error: "ABV is required",
        invalid_type_error: "ABV must be valid"
    }),
    ibu: z
        .number({
            required_error: "IBU is required",
            invalid_type_error: "IBU must be valid"
        })
        .int(),
    year: z.string().optional(),
    available: z.boolean({
        required_error: "Available is required",
        invalid_type_error: "Available must be a boolean"
    }),
    parentStyle: z.string().min(1, "Parent style is required"),
    style: z.string().min(1, "Style is required"),
    brewery: z.string().min(1, "Brewery is required"),
    images: z.array(z.object({ value: z.custom<File>() })).optional()
});

export const BeerEditSchema = z.object({
    name: z.string().min(1, {
        message: "Beer name is required"
    }),
    headline: z.string().min(1, {
        message: "Headline is required"
    }),
    description: z.string().min(1, "Description is required"),
    abv: z.number({
        required_error: "ABV is required",
        invalid_type_error: "ABV must be valid"
    }),
    ibu: z
        .number({
            required_error: "IBU is required",
            invalid_type_error: "IBU must be valid"
        })
        .int(),
    year: z.string().optional(),
    available: z.boolean({
        required_error: "Available is required",
        invalid_type_error: "Available must be a boolean"
    }),
    parentStyle: z.string().min(1, "Parent style is required"),
    style: z.string().min(1, "Style is required"),
    brewery: z.string().min(1, "Brewery is required")
});

export const BeerSchemaCreate = z.object({
    name: z.string().min(1, {
        message: "Beer name is required"
    }),
    headline: z.string().min(1, {
        message: "Headline is required"
    }),
    description: z.string().min(1, "Description is required"),
    abv: z.number({
        required_error: "ABV is required",
        invalid_type_error: "ABV must be valid"
    }),
    ibu: z
        .number({
            required_error: "IBU is required",
            invalid_type_error: "IBU must be valid"
        })
        .int(),
    year: z.string().optional(),
    available: z.boolean({
        required_error: "Available is required",
        invalid_type_error: "Available must be a boolean"
    }),
    parentStyle: z.string().min(1, "Parent style is required"),
    style: z.string().min(1, "Style is required"),
    brewery: z.string().min(1, "Brewery is required"),
    images: z
        .array(z.object({ order: z.number(), image: z.string() }))
        .optional()
});

export const BeerSearchSchema = z.object({
    search: z.string().min(1, "Query is required")
});
