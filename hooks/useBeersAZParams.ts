import { z } from "zod";
import {
    useQueryState,
    useQueryStates,
    parseAsString,
    parseAsInteger
} from "nuqs";
import { useTransition } from "react";

import { zodViewParser, zodSortParser } from "@/lib/parsers";
import useViewStore from "./useViewType";

const ViewSchema = z.enum(["", "grid", "list"]);
type ViewOption = z.infer<typeof ViewSchema>;

export function useBeersAZParams() {
    const [isPending, startTransition] = useTransition();
    const { setIsLoading } = useViewStore();

    const [letter, setParamLetter] = useQueryState(
        "letter",
        parseAsString.withDefault("A").withOptions({
            shallow: false,
            history: "push",
            clearOnDefault: false,
            startTransition
        })
    );

    const [view, setView] = useQueryState(
        "view",
        zodViewParser.withDefault("grid" as ViewOption).withOptions({
            shallow: true
        })
    );

    const [{ page, pageSize }, setParams] = useQueryStates(
        {
            page: parseAsInteger.withDefault(1),
            pageSize: parseAsInteger.withDefault(10)
        },
        {
            shallow: false,
            startTransition,
            history: "push"
        }
    );

    const setPage = (newPage: number) => {
        setParams({ page: newPage });
        setIsLoading(true);
    };

    const setPageSize = (newPageSize: number) => {
        setParams({ pageSize: newPageSize, page: 1 });
    };

    const setLetter = (newLetter: string) => {
        setParamLetter(newLetter);
        setPage(1);
    };

    return {
        letter,
        setLetter,
        view,
        setView,
        page,
        setPage,
        pageSize,
        setPageSize,
        isPending
    };
}
