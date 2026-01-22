// --------------------------------------------------------
// BEER SCHEMAS (Zod 4 Safe)
// --------------------------------------------------------

import * as z from "zod";
import {
    stringRequired,
    numberRequired,
    intRequired,
    booleanRequired,
    fileObjectArray,
    coercedNumber,
    abvRange,
    ibuIntRange
} from "@/schemas/helpers";

// --------------------------------------------------------
// Base fields for all Beer schemas
// --------------------------------------------------------

const beerBaseFields = {
    name: stringRequired("Beer name is required"),
    headline: stringRequired("Headline is required"),
    description: stringRequired("Description is required"),

    abv: numberRequired("ABV is required"),
    ibu: intRequired("IBU must be valid"),

    year: z.string().optional(),
    available: booleanRequired("Available must be a boolean"),

    parentStyle: stringRequired("Parent style is required"),
    style: stringRequired("Style is required"),
    brewery: stringRequired("Brewery is required")
};

// --------------------------------------------------------
// 1. BeerSchema
// --------------------------------------------------------

export const BeerSchema = z.object({
    ...beerBaseFields,
    images: fileObjectArray().optional()
});

// --------------------------------------------------------
// 2. BeerEditSchema
// --------------------------------------------------------

export const BeerEditSchema = z.object({
    ...beerBaseFields
});

// --------------------------------------------------------
// 3. BeerSchemaCreate
// --------------------------------------------------------

export const BeerSchemaCreate = z.object({
    ...beerBaseFields,
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
// 4. Search schema
// --------------------------------------------------------

export const BeerSearchSchema = z.object({
    search: stringRequired("Query is required")
});

// --------------------------------------------------------
// 5. ABV Range Schema { min, max }
// --------------------------------------------------------

export const BeerAbvSchema = z.object({
    abv: abvRange()
});

// --------------------------------------------------------
// 6. IBU Range Schema { min, max }
// --------------------------------------------------------

export const BeerIbuSchema = z.object({
    ibu: ibuIntRange()
});

// --------------------------------------------------------
// 7. Year Created Range
// --------------------------------------------------------

export const BeerYearSchema = z.object({
    yearCreated: z.tuple([z.number().int(), z.number().int()])
});
