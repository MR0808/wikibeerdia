"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FilterButton } from "@/components/form/Buttons";
import { Slider } from "@/components/ui/range-slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { BeerYearSchema } from "@/schemas/beer";
import { BeersFilterYearProps } from "@/types/beers";

const BeersFilterYear = ({
    yearCreated,
    setYearCreated,
    highestYear,
    lowestYear
}: BeersFilterYearProps) => {
    let yearArray: [number, number] = [lowestYear, highestYear];
    if (yearCreated.length > 0) yearArray = [yearCreated[0], yearCreated[1]] as [number, number];

    const formYear = useForm<z.infer<typeof BeerYearSchema>>({
        resolver: zodResolver(BeerYearSchema),
        defaultValues: {
            yearCreated: yearArray
        }
    });

    const onSubmitYear = (values: z.infer<typeof BeerYearSchema>) => {
        setYearCreated(values.yearCreated);
    };

    const onYearReset = () => {
        setYearCreated([]);
        formYear.reset();
    };

    useEffect(() => {
        if (
            JSON.stringify(yearCreated) ===
                JSON.stringify([lowestYear, highestYear]) ||
            yearCreated.length === 0
        )
            formYear.reset();
    }, [yearCreated]);

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                Year Created Range
            </div>
            {yearArray.length > 0 &&
                JSON.stringify(yearArray) !==
                    JSON.stringify([lowestYear, highestYear]) && (
                    <div
                        className="cursor-pointer pb-2 text-sm hover:underline"
                        onClick={onYearReset}
                    >
                        Clear
                    </div>
                )}
            <Form {...formYear}>
                <form
                    className="flex w-full flex-col justify-start space-y-5"
                    onSubmit={formYear.handleSubmit(onSubmitYear)}
                >
                    <FormField
                        control={formYear.control}
                        name="yearCreated"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="w-full pt-3">
                                        <Slider
                                            min={lowestYear}
                                            max={highestYear}
                                            step={1}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="w-full"
                                        />
                                        <div className="flex w-full flex-row justify-between pt-6 leading-none font-medium">
                                            <span>{field.value[0]}</span>
                                            <span>{field.value[1]}</span>
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FilterButton text="apply" className="w-fit" />
                </form>
            </Form>
        </div>
    );
};
export default BeersFilterYear;
