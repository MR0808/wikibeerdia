"use client";

import React, { useState, useCallback, useRef, FC, ChangeEvent } from "react";
import { useClickAway } from "react-use";

import { useBreweriesParams } from "@/hooks/useBreweriesParams";

interface Option {
    value: string;
    text: string;
}

type NiceSelectProps = {
    options: Option[];
    defaultCurrent: number;
    placeholder: string;
};

const BreweriesSortSelect: FC<NiceSelectProps> = ({
    options,
    defaultCurrent,
    placeholder
}) => {
    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const ref = useRef<HTMLDivElement | null>(null);

    const { sort, setSort } = useBreweriesParams();

    const selected = options.filter((option) => option.value === sort);

    const [current, setCurrent] = useState<Option>(
        selected[0] || options[defaultCurrent]
    );

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
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
            <span className="current">{current?.text || placeholder}</span>
            <ul
                className={`nice-select-list ${open ? "nice-select-open" : ""}`}
                role="menubar"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {options?.map((item, i) => (
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
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreweriesSortSelect;
