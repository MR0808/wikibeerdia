"use client";

import { useState, useCallback, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useClickAway } from "react-use";

import { getFilterUrl } from "@/lib/utils";
import { useBreweriesParams } from "@/hooks/useBreweriesParams";
import { BreweriesSortSelectProps, Option } from "@/types/breweries";

const BreweriesSortSelect = ({
    sortOrders,
    sort,
    params
}: BreweriesSortSelectProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const ref = useRef<HTMLDivElement | null>(null);
    const { sort: nuqsSort, setSort: setNuqsSort } = useBreweriesParams();

    const selected = sortOrders.filter((option) => option.value === sort);

    const [current, setCurrent] = useState<Option>(
        selected[0] || sortOrders[0]
    );

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // router.push(
        //     getFilterUrl({ params, sort: event.target.value, url: "breweries" })
        // );
        setNuqsSort(event.target.value);
    };

    useClickAway(ref, onClose);

    const currentHandler = (item: Option) => {
        setCurrent(item);
        handleTypeChange({
            target: { value: item.value }
        } as ChangeEvent<HTMLSelectElement>);
        onClose();
    };

    return (
        <div
            className={`nice-select after:nice-select-after ${open && "after:nice-select-open-after"}`}
            role="button"
            tabIndex={0}
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={(e) => e}
            ref={ref}
        >
            <span className="current">{current?.name || ""}</span>
            <ul
                className={`nice-select-list ${open ? "nice-select-open" : ""}`}
                role="menubar"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {sortOrders.map((item, i) => (
                    <li
                        key={i}
                        data-value={item.value}
                        className={`nice-select-option ${
                            item.value === current?.value
                                ? "nice-select-selected"
                                : ""
                        } nice-select-hover`}
                        style={{ fontSize: "14px" }}
                        role="menuitem"
                        onClick={() => currentHandler(item)}
                        onKeyDown={(e) => e}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreweriesSortSelect;
