import { useQueryStates } from 'nuqs';

export function useBreweriesParams() {
    const [{ view, sort, page, pageSize }, setParams] = useQueryStates({
        view: {
            parse: (value) => value || '',
            shallow: true
        },
        sort: {
            parse: (value) => value || '',
            shallow: false
        },
        page: {
            parse: (value) => value || '',
            shallow: false
        },
        pageSize: {
            parse: (value) => value || '',
            shallow: false
        },
    }, {
        history: 'push',
    });


    const setView = (newView: string) => {
        setParams({ view: newView });
    };

    const setSort = (newSort: string) => {
        setParams({ sort: newSort, page: "1" });

    };

    const setPage = (newPage: string) => {
        setParams({ page: newPage });
    };

    const setPageSize = (newPageSize: string) => {
        setParams({ pageSize: newPageSize, page: '1' });
    };

    return {
        view,
        setView,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize
    };
}