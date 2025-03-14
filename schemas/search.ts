import * as z from "zod";

export const SearchSchema = z.object({
    query: z.string().min(1, "Search query is required"),
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(10),
    type: z.enum(["all", "beers", "breweries"]).default("all")
});

export const SiteSearchSchema = z.object({
    query: z.string().min(1, "Query is required")
});
