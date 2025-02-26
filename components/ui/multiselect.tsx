"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

type MultiSelectProps = {
    options: string[];
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
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleUnselect = (option: string) => {
        onChange(selected.filter((s) => s !== option));
    };

    const selectables = options.filter((option) => !selected.includes(option));

    return (
        <Command className="overflow-visible bg-transparent">
            <div className="group border-input ring-offset-background focus-within:ring-ring rounded-md border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                    {selected.map((option) => {
                        return (
                            <Badge key={option} variant="secondary">
                                {option}
                                <button
                                    className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(option);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(option)}
                                >
                                    <X className="text-muted-foreground hover:text-foreground h-3 w-3 cursor-pointer" />
                                </button>
                            </Badge>
                        );
                    })}
                    <CommandInput
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                {open && selectables.length > 0 ? (
                    <div className="bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none">
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((option) => {
                                    return (
                                        <CommandItem
                                            key={option}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                setInputValue("");
                                                onChange([...selected, option]);
                                            }}
                                            className={"cursor-pointer"}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onChange([
                                                        ...selected,
                                                        option
                                                    ]);
                                                    setInputValue("");
                                                }
                                            }}
                                        >
                                            {option}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}
