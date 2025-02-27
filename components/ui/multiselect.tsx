"use client";

import { useRef, useState, useEffect } from "react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type MultiSelectProps = {
    options: { parent?: string; value: string; label: string }[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
};

/**
 * A multi-select component that allows the user to select multiple options from a list of options.
 * @param {string[]} options The list of options to select from.
 * @param {string[]} selected The currently selected options.
 * @param {(selected: string[]) => void} onChange A callback function that is called when the user selects or unselects an option.
 * @param {string} [placeholder="Select options..."] The placeholder text that is displayed when the user has not yet selected any options.
 */
export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select options..."
}: MultiSelectProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const selectables = options.filter(
        (option) => !selected.includes(option.value)
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    let parent = "";
    let indent = false;

    return (
        <Command className="overflow-visible bg-transparent">
            <div
                className="group border-dark input ring-offset-background focus-within:ring-ring rounded-4xl border-2 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2"
                onClick={() => setOpen(true)}
            >
                <div className="flex flex-wrap gap-1">
                    <CommandInput
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        placeholder={placeholder}
                        className="placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none"
                    />
                </div>
            </div>
            <div className="relative mt-2" ref={dropdownRef}>
                {open && selectables.length > 0 ? (
                    <div className="bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none">
                        <CommandList
                            className={cn("max-h-[300px] overflow-hidden")}
                        >
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup className="max-h-[300px] overflow-auto">
                                {selectables.map((option) => {
                                    if (
                                        option.parent &&
                                        option.parent !== parent
                                    ) {
                                        parent = option.parent;
                                        indent = true;
                                        return (
                                            <CommandItem
                                                key={option.parent}
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                className="font-bold"
                                            >
                                                {option.parent}
                                            </CommandItem>
                                        );
                                    } else {
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onSelect={() => {
                                                    setInputValue("");
                                                    onChange([
                                                        ...selected,
                                                        option.value
                                                    ]);
                                                }}
                                                className={`cursor-pointer ${indent ? "ml-2" : ""}`}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        onChange([
                                                            ...selected,
                                                            option.value
                                                        ]);
                                                        setInputValue("");
                                                    }
                                                }}
                                            >
                                                {option.label}
                                            </CommandItem>
                                        );
                                    }
                                })}
                            </CommandGroup>
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}
