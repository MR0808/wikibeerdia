"use client";

import { Star } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BeersFilterRatingProps } from "@/types/beers";

const BeersFilterRating = ({ rating, setRating }: BeersFilterRatingProps) => {
    const handleRatingChange = (value: string) => {
        setRating(parseInt(value));
    };

    const ratings = [
        { value: "5", label: "5 stars" },
        { value: "4", label: "4 stars & up" },
        { value: "3", label: "3 stars & up" },
        { value: "2", label: "2 stars & up" },
        { value: "1", label: "1 star & up" },
        { value: "0", label: "No rating" }
    ];

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                Average Rating
            </div>
            <div className="flex flex-col space-y-4">
                <RadioGroup
                    value={rating.toString()}
                    onValueChange={handleRatingChange}
                >
                    {ratings.map((item) => (
                        <div
                            key={item.value}
                            className="mb-2 flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={`rating-${item.value}`}
                            />
                            <Label
                                htmlFor={`rating-${item.value}`}
                                className="flex cursor-pointer items-center"
                            >
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-5 w-5 ${
                                            index < Number.parseInt(item.value)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    {item.label}
                                </span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                {/* 
                            <Checkbox
                                id={breweryType.name}
                                checked={type.includes(breweryType.name)}
                                onCheckedChange={(checked) =>
                                    handleTypeChange(
                                        breweryType.name,
                                        checked as boolean
                                    )
                                }
                            /> */}
            </div>
        </div>
    );
};
export default BeersFilterRating;
