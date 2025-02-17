// lib/searchParamsCache.ts
import {
    createSearchParamsCache,
    parseAsString,
    parseAsInteger,
    parseAsStringEnum
} from "nuqs/server";

enum View {
    grid = "grid",
    list = "list"
}

export const searchParamsCacheBeersAZ = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    letter: parseAsString.withDefault("A"),
    view: parseAsStringEnum<View>(Object.values(View)).withDefault(View.grid)
});
