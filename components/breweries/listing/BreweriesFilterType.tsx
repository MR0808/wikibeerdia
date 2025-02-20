"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { BreweriesFilterTypeProps } from "@/types/breweries";

const BreweriesFilterType = ({
    type,
    setType,
    breweryTypes
}: BreweriesFilterTypeProps) => {
    const handleTypeChange = (typeChecked: string, checked: boolean) => {
        let newTypes = type;
        if (checked) {
            newTypes = [...newTypes, typeChecked];
        } else {
            newTypes = newTypes.filter((t) => t !== typeChecked);
        }
        setType(newTypes);
    };

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                Brewery Type
            </div>
            <div className="flex flex-col space-y-4">
                {type.length > 0 && (
                    <div
                        className="cursor-pointer text-sm hover:underline"
                        onClick={() => setType([])}
                    >
                        Clear
                    </div>
                )}
                {breweryTypes.map((breweryType) => {
                    return (
                        <div
                            key={breweryType.name}
                            className="items-top flex space-x-2"
                        >
                            <Checkbox
                                id={breweryType.name}
                                checked={type.includes(breweryType.name)}
                                onCheckedChange={(checked) =>
                                    handleTypeChange(
                                        breweryType.name,
                                        checked as boolean
                                    )
                                }
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={breweryType.name}
                                    className="leading-none font-medium"
                                >
                                    {`${breweryType.name} (${breweryType.count})`}
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default BreweriesFilterType;
