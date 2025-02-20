import { z } from "zod";
import {
    useQueryState,
    useQueryStates,
    parseAsString,
    parseAsInteger,
    parseAsArrayOf,
    parseAsFloat,
    parseAsBoolean
} from "nuqs";
import { useTransition } from "react";

import {
    zodViewParser,
    zodSortParser,
    zodAvailableParser
} from "@/lib/parsers";
import useViewStore from "./useViewType";

const SortSchema = z.enum(["", "az", "za", "newest", "oldest", "popular"]);
const ViewSchema = z.enum(["", "grid", "list"]);
const AvailableSchema = z.enum(["", "true", "false"]);
type SortOption = z.infer<typeof SortSchema>;
type ViewOption = z.infer<typeof ViewSchema>;
type AvailableOption = z.infer<typeof AvailableSchema>;

export function useBeersParams() {
    const [isPending, startTransition] = useTransition();
    const { setIsLoading } = useViewStore();

    const [search, setParamSearch] = useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({
            shallow: false,
            history: "push",
            startTransition
        })
    );

    const [abv, setParamAbv] = useQueryState(
        "abv",
        parseAsArrayOf(parseAsFloat).withDefault([]).withOptions({
            shallow: false,
            history: "push",
            startTransition
        })
    );

    const [ibu, setParamIbu] = useQueryState(
        "ibu",
        parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({
            shallow: false,
            history: "push",
            startTransition
        })
    );

    const [yearCreated, setParamYearCreated] = useQueryState(
        "yearCreated",
        parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({
            shallow: false,
            history: "push",
            startTransition
        })
    );

    const [rating, setParamRating] = useQueryState(
        "rating",
        parseAsInteger.withDefault(0).withOptions({
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

    const [brewery, setParamBrewery] = useQueryState("brewery", {
        defaultValue: [],
        parse: (value) => value.split(",").filter(Boolean),
        serialize: (value) => value.join(","),
        shallow: false,
        startTransition
    });

    const [style, setParamStyle] = useQueryState("style", {
        defaultValue: [],
        parse: (value) => value.split(",").filter(Boolean),
        serialize: (value) => value.join(","),
        shallow: false,
        startTransition
    });

    const [view, setView] = useQueryState(
        "view",
        zodViewParser.withDefault("grid" as ViewOption).withOptions({
            shallow: true
        })
    );

    const [{ sort, page, pageSize, available }, setParams] = useQueryStates(
        {
            sort: zodSortParser.withDefault("" as SortOption),
            available: zodAvailableParser.withDefault("" as AvailableOption),
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

    const setAvailable = (newAvailable: AvailableOption) => {
        setParams({ available: newAvailable, page: 1 });
    };

    const setPage = (newPage: number) => {
        setParams({ page: newPage });
        setIsLoading(true);
    };

    const setPageSize = (newPageSize: number) => {
        setParams({ pageSize: newPageSize, page: 1 });
    };

    const setStyle = (newStyle: string[]) => {
        if (newStyle.length == 0) {
            setParamStyle(null);
        } else {
            setParamStyle(newStyle);
        }
        setParams({ page: 1 });
    };

    const setBrewery = (newBrewery: string[]) => {
        if (newBrewery.length == 0) {
            setParamBrewery(null);
        } else {
            setParamBrewery(newBrewery);
        }
        setParams({ page: 1 });
    };

    const setCountry = (newCountry: string[]) => {
        if (newCountry.length == 0) {
            setParamCountry(null);
        } else {
            setParamCountry(newCountry);
        }
        setParams({ page: 1 });
    };

    const setAbv = (newAbv: number[]) => {
        if (newAbv.length == 0) {
            setParamAbv(null);
        } else {
            setParamAbv(newAbv);
        }
        setParams({ page: 1 });
    };

    const setIbu = (newIbu: number[]) => {
        if (newIbu.length == 0) {
            setParamIbu(null);
        } else {
            setParamIbu(newIbu);
        }
        setParams({ page: 1 });
    };

    const setYearCreated = (newYearCreated: number[]) => {
        if (newYearCreated.length == 0) {
            setParamYearCreated(null);
        } else {
            setParamYearCreated(newYearCreated);
        }
        setParams({ page: 1 });
    };

    const setRating = (newRating: number) => {
        setParamRating(newRating);
        setPage(1);
    };

    const setSearch = (newSearch: string) => {
        setParamSearch(newSearch);
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
        search,
        setSearch,
        country,
        setCountry,
        rating,
        setRating,
        style,
        setStyle,
        brewery,
        setBrewery,
        abv,
        setAbv,
        ibu,
        setIbu,
        yearCreated,
        setYearCreated,
        available,
        setAvailable,
        isPending
    };
}
