import * as z from "zod";
import { Status } from "@prisma/client";

export const BreweryTypeSchema = z.object({
    name: z.string().min(1, {
        message: "Brewery type is required"
    }),
    status: z.nativeEnum(Status, {
        message: "Status is required"
    })
});

const ibuSchema = z.number().int().min(0).max(100);
const abvSchema = z.number().min(0).max(30);

export const BeerStyleSchema = z.object({
    name: z.string().min(1, {
        message: "Beer style is required"
    }),
    status: z.nativeEnum(Status, {
        message: "Status is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    region: z.array(z.string()),
    abv: z.array(abvSchema).length(2),
    ibu: z.array(ibuSchema).length(2)
});

export const typesSearchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional()
});

export const SearchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
    parentStyle: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional()
});

export const breweriesSearchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional()
});
