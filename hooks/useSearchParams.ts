import { z } from "zod";
import {
    useQueryState,
    useQueryStates,
    parseAsString,
    parseAsInteger,
    parseAsArrayOf
} from "nuqs";
import { useTransition } from "react";

import { zodViewParser, zodSortParser, zodTypeParser } from "@/lib/parsers";
import useViewStore from "./useViewType";

const SortSchema = z.enum(["", "az", "za", "newest", "oldest", "popular"]);
const ViewSchema = z.enum(["", "grid", "list"]);
const TypeSchema = z.enum(["all", "beers", "breweries"]);
type SortOption = z.infer<typeof SortSchema>;
type ViewOption = z.infer<typeof ViewSchema>;
type TypeOption = z.infer<typeof TypeSchema>;

export function useSearchParams() {
    const [isPending, startTransition] = useTransition();
    const { setIsLoading } = useViewStore();

    const [query, setParamQuery] = useQueryState(
        "q",
        parseAsString.withDefault("").withOptions({
            shallow: false,
            history: "push",
            startTransition
        })
    );

    const [country, setParamCountry] = useQueryState("country", {
        defaultValue: [],
        parse: (value) => value.split(",").filter(Boolean),
        serialize: (value) => value.join(","),
        shallow: false,
        startTransition
    });

    const [rating, setParamRating] = useQueryState(
        "rating",
        parseAsInteger.withDefault(0).withOptions({
            shallow: false,
            history: "push",
            startTransition
        })
    );

    const [view, setView] = useQueryState(
        "view",
        zodViewParser.withDefault("grid" as ViewOption).withOptions({
            shallow: true
        })
    );

    const [{ sort, page, pageSize, type }, setParams] = useQueryStates(
        {
            sort: zodSortParser.withDefault("" as SortOption),
            type: zodTypeParser.withDefault("all" as TypeOption),
            page: parseAsInteger.withDefault(1),
            pageSize: parseAsInteger.withDefault(10)
        },
        {
            shallow: false,
            startTransition,
            history: "push"
        }
    );

    const setSort = (newSort: SortOption) => {
        setParams({ sort: newSort, page: 1 });
    };

    const setType = (newType: TypeOption) => {
        setParams({ type: newType, page: 1 });
    };

    const setPage = (newPage: number) => {
        setParams({ page: newPage });
        setIsLoading(true);
    };

    const setPageSize = (newPageSize: number) => {
        setParams({ pageSize: newPageSize, page: 1 });
    };

    const setQuery = (newQuery: string) => {
        setParamQuery(newQuery);
        setPage(1);
    };

    const setCountry = (newCountry: string[]) => {
        if (newCountry.length == 0) {
            setParamCountry(null);
        } else {
            setParamCountry(newCountry);
        }
        setParams({ page: 1 });
    };

    const setRating = (newRating: number) => {
        setParamRating(newRating);
        setPage(1);
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
        query,
        setQuery,
        type,
        setType,
        country,
        setCountry,
        rating,
        setRating,
        isPending
    };
}
