"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FilterButton } from "@/components/form/Buttons";
import { Slider } from "@/components/ui/range-slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { BreweriesFilterBeersProps } from "@/types/breweries";
import { BreweryBeersSchema } from "@/schemas/brewery";

const BreweriesFilterBeers = ({
    beers,
    setBeers,
    highestBeers
}: BreweriesFilterBeersProps) => {
    const onBeersReset = () => {
        setBeers([]);
        formBeers.reset();
    };

    let beersArray: [number, number] = [0, highestBeers];
    if (beers.length > 0) beersArray = [beers[0], beers[1]] as [number, number];

    const formBeers = useForm<z.infer<typeof BreweryBeersSchema>>({
        resolver: zodResolver(BreweryBeersSchema),
        defaultValues: {
            beers: beersArray
        }
    });

    const onSubmitBeers = (values: z.infer<typeof BreweryBeersSchema>) => {
        setBeers(values.beers);
    };

    useEffect(() => {
        if (
            JSON.stringify(beers) === JSON.stringify([0, 10]) ||
            beers.length === 0
        )
            formBeers.reset();
    }, [beers]);
    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                Number of Beers
            </div>
            {beersArray.length > 0 &&
                JSON.stringify(beersArray) !== JSON.stringify([0, 10]) && (
                    <div
                        className="cursor-pointer pb-2 text-sm hover:underline"
                        onClick={onBeersReset}
                    >
                        Clear
                    </div>
                )}
            <Form {...formBeers}>
                <form
                    className="flex w-full flex-col justify-start space-y-5"
                    onSubmit={formBeers.handleSubmit(onSubmitBeers)}
                >
                    <FormField
                        control={formBeers.control}
                        name="beers"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="w-full pt-3">
                                        <Slider
                                            min={0}
                                            max={highestBeers}
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
export default BreweriesFilterBeers;
