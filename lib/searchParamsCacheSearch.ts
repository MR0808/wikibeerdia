// lib/searchParamsCache.ts
import {
    createSearchParamsCache,
    parseAsString,
    parseAsInteger,
    parseAsStringEnum,
    parseAsArrayOf,
    parseAsBoolean,
    parseAsFloat
} from "nuqs/server";

enum View {
    grid = "grid",
    list = "list"
}

export const searchParamsCacheSearch = createSearchParamsCache({
    search: parseAsString.withDefault(""),
    country: parseAsString.withDefault(""),
    style: parseAsString.withDefault(""),
    brewery: parseAsString.withDefault(""),
    abv: parseAsArrayOf(parseAsInteger).withDefault([]),
    ibu: parseAsArrayOf(parseAsFloat).withDefault([]),
    yearCreated: parseAsArrayOf(parseAsInteger).withDefault([]),
    available: parseAsString.withDefault(""),
    sort: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    rating: parseAsInteger.withDefault(0),
    view: parseAsStringEnum<View>(Object.values(View)).withDefault(View.grid)
});
