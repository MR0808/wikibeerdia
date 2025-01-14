import * as z from "zod";

import {
    typesSearchParamsSchema,
    SearchParamsSchema,
    breweriesSearchParamsSchema
} from "@/schemas/admin";

export type GetTypesSchema = z.infer<typeof typesSearchParamsSchema>;

export type GetBreweriesSchema = z.infer<typeof breweriesSearchParamsSchema>;

export type GetSearchSchema = z.infer<typeof SearchParamsSchema>;

