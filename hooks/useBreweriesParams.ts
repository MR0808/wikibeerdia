import { useQueryState, useQueryStates, parseAsString, parseAsInteger, createParser } from 'nuqs';
import { useTransition } from 'react';
import { z } from 'zod';

const SortSchema = z.enum(['', 'az', 'za', 'newest', 'oldest', 'popular']);
const ViewSchema = z.enum(['', 'grid', 'list'])
type SortOption = z.infer<typeof SortSchema>;
type ViewOption = z.infer<typeof ViewSchema>;

export const zodSortParser = createParser({
    parse: (value: string | null): SortOption => {
        const result = SortSchema.safeParse(value ?? '');
        return result.success ? result.data : '';
    },
    serialize: (value: SortOption) => value,
});

export const zodViewParser = createParser({
    parse: (value: string | null): ViewOption => {
        const result = ViewSchema.safeParse(value ?? '');
        return result.success ? result.data : '';
    },
    serialize: (value: ViewOption) => value,
});

export function useBreweriesParams() {

    const [isPending, startTransition] = useTransition();

    const [query, setQuery] = useQueryState('search',
        parseAsString.withDefault('').withOptions({
            shallow: false,
            history: 'push',
            startTransition
        })
    );

    const [view, setView] = useQueryState('search',
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
        isPending
    };
}