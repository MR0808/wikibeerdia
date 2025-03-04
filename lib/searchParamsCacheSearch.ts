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

enum Type {
    all = "all",
    beers = "beers",
    breweries = "breweries"
}

export const searchParamsCacheSearch = createSearchParamsCache({
    q: parseAsString.withDefault(""),
    sort: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    view: parseAsStringEnum<View>(Object.values(View)).withDefault(View.grid),
    type: parseAsStringEnum<Type>(Object.values(Type)).withDefault(Type.all)
});
