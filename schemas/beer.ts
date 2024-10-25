import * as z from "zod";
import { zfd } from "zod-form-data";

export const BeerSchema = z.object({
    name: z.string().min(1, {
        message: "Brewery name is required"
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
    subStyle: z.string().min(1, "Sub Style is required"),
    brewery: z.string().min(1, "Brewery is required"),
    images: z.array(z.object({ value: z.custom<File>() })).optional()
});

export const BeerSchemaCreate = z.object({
    name: z.string().min(1, {
        message: "Brewery name is required"
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
    subStyle: z.string().min(1, "Sub Style is required"),
    brewery: z.string().min(1, "Brewery is required"),
    images: z
        .array(z.object({ order: z.number(), image: z.string() }))
        .optional()
});

export const BeerSchemaFormData = zfd.formData({
    name: zfd.text(),
    headline: zfd.text(),
    description: zfd.text(),
    abv: zfd.text(),
    ibu: zfd.text(),
    year: zfd.text(),
    available: zfd.text(),
    subStyle: zfd.text(),
    brewery: zfd.text(),
    images: zfd.repeatable(z.array(zfd.file()).optional())
});
