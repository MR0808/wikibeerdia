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

export const BeerStyleSchema = z.object({
    name: z.string().min(1, {
        message: "Beer style is required"
    }),
    status: z.nativeEnum(Status, {
        message: "Status is required"
    }),
    description: z.optional(z.string())
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
    subStyles: z.string().optional(),
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
