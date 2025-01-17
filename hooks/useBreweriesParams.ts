import { useQueryStates } from 'nuqs';

export function useBreweriesParams() {
    const [{ sort, page }, setParams] = useQueryStates({

        sort: {
            defaultValue: '',
            parse: (value) => value || '',
        },
        page: {
            defaultValue: '1',
            parse: (value) => value || '1',
        },
    }, {
        history: 'push',
        shallow: false
    });

    const setSort = (newSort: string) => {
        setParams({ sort: newSort, page: '1' });
    };
    const setPage = (newPage: string) => {
        setParams({ page: newPage });
    };

    return {
        sort,
        setSort,
        page,
        setPage,
    };
}