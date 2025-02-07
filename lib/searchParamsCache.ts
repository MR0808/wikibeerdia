// lib/searchParamsCache.ts
import {
    createSearchParamsCache,
    parseAsString,
    parseAsInteger,
    parseAsStringEnum,
    parseAsArrayOf
} from "nuqs/server";

enum View {
    grid = "grid",
    list = "list"
}

export const searchParamsCache = createSearchParamsCache({
    search: parseAsString.withDefault(""),
    country: parseAsString.withDefault(""),
    type: parseAsString.withDefault(""),
    beers: parseAsArrayOf(parseAsInteger).withDefault([]),
    sort: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    rating: parseAsInteger.withDefault(0),
    view: parseAsStringEnum<View>(Object.values(View)).withDefault(View.grid)
});
