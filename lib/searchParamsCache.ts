// lib/searchParamsCache.ts
import { createSearchParamsCache, parseAsString, parseAsInteger, parseAsStringEnum } from 'nuqs/server';

enum View {
    grid = 'grid', list = 'list'
}

export const searchParamsCache = createSearchParamsCache({
    search: parseAsString.withDefault(''),
    country: parseAsString.withDefault(''),
    sort: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    view: parseAsStringEnum<View>(Object.values(View)).withDefault(View.grid)
})