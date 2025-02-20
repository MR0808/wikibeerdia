"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BeersFilterStyleProps, StyleFilter } from "@/types/beers";
import { useBreweryFilterStore } from "@/hooks/useBreweryFilterStore";
import { getStylesNames } from "@/actions/beers";

const BeersFilterStyle = ({
    style,
    setStyle,
    styles
}: BeersFilterStyleProps) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { stylesList, setStylesList } = useBreweryFilterStore();

    useEffect(() => {
        const getStyles = async () => {
            const data = await getStylesNames(style);
            if (data.data) setStylesList(data.data);
        };
        getStyles();
    }, []);

    // Group styles by parentStyleName
    const groupedStyles = styles.reduce<Record<string, StyleFilter[]>>(
        (acc, style) => {
            if (!acc[style.parentStyleName]) acc[style.parentStyleName] = [];
            acc[style.parentStyleName].push(style);
            return acc;
        },
        {}
    );

    // Filter styles based on search
    const filteredGroups = Object.keys(groupedStyles).reduce<
        Record<string, StyleFilter[]>
    >((acc, parentStyle) => {
        const filtered = groupedStyles[parentStyle].filter((style) =>
            style.name.toLowerCase().includes(search.toLowerCase())
        );
        if (filtered.length) acc[parentStyle] = filtered;
        return acc;
    }, {});

    // Handle style selection
    const handleSelect = (selectedStyle: StyleFilter) => {
        let newStyle = style;
        if (!stylesList.find((s) => s.id === selectedStyle.id)) {
            setStylesList([...stylesList, selectedStyle]);
        } else {
            setStylesList(
                stylesList.filter((item) => item.id !== selectedStyle.id)
            );
        }
        if (!newStyle.includes(selectedStyle.slug)) {
            newStyle = [...newStyle, selectedStyle.slug];
            setStyle(newStyle);
        } else {
            newStyle = newStyle.filter((s) => s !== selectedStyle.slug);
            setStyle(newStyle);
        }
        // setIsOpen(false);
    };

    // Handle style removal
    const handleRemove = (slug: string) => {
        setStylesList(stylesList.filter((s) => s.slug !== slug));
        setStyle(style.filter((s) => s !== slug));
    };

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                Beer Style
            </div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        // className="w-full justify-between"
                        className="text-muted-foreground h-16 w-full justify-start rounded-none p-6 text-lg shadow-none"
                    >
                        Select styles...
                    </Button>
                </PopoverTrigger>

                {/* Dropdown Content */}
                <PopoverContent className="w-full p-2">
                    <Input
                        placeholder="Search styles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-2"
                    />
                    <ScrollArea className="h-64">
                        {Object.keys(filteredGroups).map((parentStyle) => (
                            <div key={parentStyle} className="mb-2">
                                <div className="text-sm font-bold">
                                    {parentStyle}
                                </div>
                                {filteredGroups[parentStyle].map((style) => (
                                    <div
                                        key={style.id}
                                        className="flex cursor-pointer flex-row justify-between rounded-md p-2 hover:bg-gray-100"
                                        onClick={() => handleSelect(style)}
                                    >
                                        <div>{style.name}</div>
                                        {stylesList.some(
                                            (item) => item.id === style.id
                                        ) && (
                                            <div className="text-red-950">
                                                <Check />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </ScrollArea>
                    <Button
                        type="button"
                        className="mt-2 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </Button>
                </PopoverContent>
            </Popover>

            {/* Selected Styles */}
            <div className="mt-2 flex flex-wrap gap-2">
                {stylesList.map((style) => (
                    <Badge key={style.id} className="flex items-center gap-2">
                        {style.name}
                        <button
                            onClick={() => handleRemove(style.slug)}
                            className="ml-1 cursor-pointer text-xs"
                        >
                            ✕
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};
export default BeersFilterStyle;
