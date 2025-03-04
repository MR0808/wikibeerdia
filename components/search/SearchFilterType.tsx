"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchFilterTypeProps, Type } from "@/types/search";

const SearchFilterType = ({ type, setType }: SearchFilterTypeProps) => {
    const handleTypeChange = (value: Type) => {
        setType(value);
    };

    const types = [
        { value: "all", label: "All" },
        { value: "beers", label: "Beers" },
        { value: "breweries", label: "Breweries" }
    ];
    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">Type</div>
            <div className="flex flex-col space-y-4">
                <RadioGroup value={type} onValueChange={handleTypeChange}>
                    {types.map((item) => (
                        <div
                            key={item.value}
                            className="mb-2 flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={`type-${item.value}`}
                            />
                            <Label
                                htmlFor={`type-${item.value}`}
                                className="text-gray-600flex ml-2 cursor-pointer items-center text-sm"
                            >
                                {item.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
};
export default SearchFilterType;
