import { z } from 'zod';
import { useQueryState, useQueryStates, parseAsString, parseAsInteger, createParser } from 'nuqs';
import { useTransition } from 'react';

import { zodViewParser, zodSortParser } from '@/lib/parsers';

const SortSchema = z.enum(['', 'az', 'za', 'newest', 'oldest', 'popular']);
const ViewSchema = z.enum(['', 'grid', 'list'])
type SortOption = z.infer<typeof SortSchema>;
type ViewOption = z.infer<typeof ViewSchema>;

export function useBreweriesParams() {
    const [isPending, startTransition] = useTransition();

    const [search, setParamSearch] = useQueryState('search',
        parseAsString.withDefault('').withOptions({
            shallow: false,
            history: 'push',
            startTransition
        })
    );

    const [country, setParamCountry] = useQueryState('country', {
        defaultValue: [],
        parse: (value) => value.split(",").filter(Boolean),
        serialize: (value) => value.join(","),
        shallow: false,
        startTransition
    });

    const [view, setView] = useQueryState('view',
        zodViewParser.withDefault("grid" as ViewOption).withOptions({
            shallow: true,
        })
    );

    const [{ type, sort, page, pageSize }, setParams] = useQueryStates({
        type: parseAsString.withDefault(""),
        sort: zodSortParser.withDefault("" as SortOption),
        page: parseAsInteger.withDefault(1),
        pageSize: parseAsInteger.withDefault(10),
    }, {
        shallow: false,
        startTransition,
        history: 'push'
    });


    const setType = (newType: string) => {
        setParams({ type: newType, page: 1 });
    };

    const setSort = (newSort: SortOption) => {
        setParams({ sort: newSort, page: 1 });
    };

    const setPage = (newPage: number) => {
        setParams({ page: newPage });
    };

    const setPageSize = (newPageSize: number) => {
        setParams({ pageSize: newPageSize, page: 1 });
    };

    const setCountry = (newCountry: string[]) => {
        setParamCountry(newCountry);
        setPage(1)
    };

    const setSearch = (newSearch: string) => {
        setParamSearch(newSearch);
        setPage(1)
    };

    return {
        view,
        setView,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize,
        type,
        setType,
        search,
        setSearch,
        country,
        setCountry,
        isPending
    };
}