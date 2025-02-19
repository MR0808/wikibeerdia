"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchBreweries } from "@/hooks/useSearchBreweries";
import { BeersFilterBreweriesProps, BreweriesResult } from "@/types/beers";
import { getBreweriesNames } from "@/actions/beers";
import { cn } from "@/lib/utils";
import { useBreweryFilterStore } from "@/hooks/useBreweryFilterStore";

const BeersFilterBrewery = ({
    brewery,
    setBrewery
}: BeersFilterBreweriesProps) => {
    const [brewerySearch, setBrewerySearch] = useState("");
    const { breweryList, setBreweryList } = useBreweryFilterStore();

    const debouncedSearch = useDebounce(brewerySearch, 300);

    const { data: options = [] } = useSearchBreweries(debouncedSearch);

    useEffect(() => {
        const getBreweries = async () => {
            const data = await getBreweriesNames(brewery);
            if (data.data) setBreweryList(data.data);
        };
        getBreweries();
    }, []);

    const addOption = (option: BreweriesResult) => {
        let newBrewery = brewery;
        if (!newBrewery.includes(option.slug)) {
            newBrewery = [...newBrewery, option.slug];
            setBrewery(newBrewery);
        }
        if (!breweryList.includes(option))
            setBreweryList([...breweryList, option]);
        setBrewerySearch("");
    };

    const removeOption = (option: string) => {
        let newBrewery = brewery;
        newBrewery = newBrewery.filter((b) => b !== option);
        setBreweryList(breweryList.filter((b) => b.slug !== option));
        setBrewery(newBrewery);
    };

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">Brewery</div>
            <div className="flex flex-col space-y-4">
                <Input
                    value={brewerySearch}
                    onChange={(e) => setBrewerySearch(e.target.value)}
                    placeholder="Search breweries..."
                    className={cn(
                        "h-16 w-full rounded-none p-6 text-lg text-black shadow-none"
                    )}
                />
                {options.length > 0 && (
                    <ul className="rounded-md border bg-white shadow-md">
                        {options.map((option) => (
                            <li
                                key={option.slug}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                                onClick={() => addOption(option)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex flex-wrap gap-2">
                    {breweryList &&
                        breweryList.map((option) => (
                            <Badge
                                key={option.slug}
                                className="flex items-center space-x-2"
                            >
                                {option.name}
                                <X
                                    size={14}
                                    className="cursor-pointer"
                                    onClick={() => removeOption(option.slug)}
                                />
                            </Badge>
                        ))}
                </div>
            </div>
        </div>
    );
};
export default BeersFilterBrewery;
