import * as z from "zod";
import { zfd } from "zod-form-data";

import getYear from "@/utils/getYear";

export const BeerSchema = z.object({
    name: z.string().min(1, {
        message: "Brewery name is required"
    }),
    headline: z.string().min(1, {
        message: "Headline is required"
    }),
    description: z.string().min(1, "Description is required"),
    abv: z
        .number({
            required_error: "ABV is required",
            invalid_type_error: "ABV must be valid"
        })
        .int(),
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
    subStyle: z.string().min(1, "Sub Style is required"),
    brewery: z.string().min(1, "Brewery is required"),
    images: z.array(z.object({ value: z.custom<File>() })).optional()
});
