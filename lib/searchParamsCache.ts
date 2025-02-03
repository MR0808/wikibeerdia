// lib/searchParamsCache.ts
import { createSearchParamsCache, parseAsString, parseAsInteger } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
    query: parseAsString.withDefault(''),
    tag: parseAsString.withDefault(''),
    sort: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    view: parseAsString.withDefault('grid')
})