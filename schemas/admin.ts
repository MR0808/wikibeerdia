import * as z from "zod";
import { Status } from '@/generated/prisma/enums';

// -----------------------
// Brewery Type Schema
// -----------------------
export const BreweryTypeSchema = z.object({
    name: z.string().min(1, "Brewery type is required"),
    status: z.enum(Object.values(Status) as [Status, ...Status[]], {
        message: "Status is required"
    })
});

// -----------------------
// IBU Schema
// -----------------------
const ibuSchema = z.number().int().min(0).max(100);

// -----------------------
// ABV Schema (0–30, step 0.1)
// -----------------------
const abvSchema = z
    .tuple([z.number().min(0).max(30).multipleOf(0.1), z.number().min(0).max(30).multipleOf(0.1)])
    .refine(([min, max]) => min <= max, {
        message: "Minimum value must be less than or equal to maximum value"
    });

// -----------------------
// Beer Style Schema
// -----------------------
export const BeerStyleSchema = z.object({
    parentStyle: z.string().min(1, "Parent style is required"),
    name: z.string().min(1, "Beer style is required"),
    status: z.enum(Object.values(Status) as [Status, ...Status[]], {
        message: "Status is required"
    }),
    description: z.string().min(1, "Description is required"),
    region: z.array(
        z.object({
            value: z.string().min(1, "Region is required")
        })
    ),
    abv: abvSchema,
    ibu: z.tuple([ibuSchema, ibuSchema])
});

// -----------------------
// Search Param Schemas
// -----------------------
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
