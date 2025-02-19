"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BeersFilterAvailableProps } from "@/types/beers";

const BeersFilterAvailable = ({
    available,
    setAvailable
}: BeersFilterAvailableProps) => {
    const handleAvailableChange = (value: "" | "true" | "false") => {
        setAvailable(value);
    };
    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                Available?
            </div>
            <div className="flex flex-col space-y-4">
                <RadioGroup
                    value={available.toString()}
                    onValueChange={handleAvailableChange}
                >
                    <div className="mb-2 flex items-center space-x-2">
                        <RadioGroupItem value="" id="all" />
                        <Label
                            htmlFor="all"
                            className="flex cursor-pointer items-center"
                        >
                            All
                        </Label>
                    </div>
                    <div className="mb-2 flex items-center space-x-2">
                        <RadioGroupItem value="true" id="true" />
                        <Label
                            htmlFor="true"
                            className="flex cursor-pointer items-center"
                        >
                            Yes
                        </Label>
                    </div>
                    <div className="mb-2 flex items-center space-x-2">
                        <RadioGroupItem value="false" id="false" />
                        <Label
                            htmlFor="false"
                            className="flex cursor-pointer items-center"
                        >
                            No
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};
export default BeersFilterAvailable;
