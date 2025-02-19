"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FilterButton } from "@/components/form/Buttons";
import { Slider } from "@/components/ui/range-slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { BeerAbvSchema } from "@/schemas/beer";
import { BeersFilterAbvProps } from "@/types/beers";

const BeersFilterAbv = ({ abv, setAbv, highestAbv }: BeersFilterAbvProps) => {
    let abvArray = [0, highestAbv];
    if (abv.length > 0) abvArray = abv;

    const formAbv = useForm<z.infer<typeof BeerAbvSchema>>({
        resolver: zodResolver(BeerAbvSchema),
        defaultValues: {
            abv: abvArray
        }
    });

    const onSubmitAbv = (values: z.infer<typeof BeerAbvSchema>) => {
        setAbv(values.abv);
    };

    const onAbvReset = () => {
        setAbv([]);
        formAbv.reset();
    };

    useEffect(() => {
        if (
            JSON.stringify(abv) === JSON.stringify([0, highestAbv]) ||
            abv.length === 0
        )
            formAbv.reset();
    }, [abv]);

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                ABV Range
            </div>
            {abvArray.length > 0 &&
                JSON.stringify(abvArray) !==
                    JSON.stringify([0, highestAbv]) && (
                    <div
                        className="cursor-pointer pb-2 text-sm hover:underline"
                        onClick={onAbvReset}
                    >
                        Clear
                    </div>
                )}
            <Form {...formAbv}>
                <form
                    className="flex w-full flex-col justify-start space-y-5"
                    onSubmit={formAbv.handleSubmit(onSubmitAbv)}
                >
                    <FormField
                        control={formAbv.control}
                        name="abv"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="w-full pt-3">
                                        <Slider
                                            min={0}
                                            max={highestAbv}
                                            step={0.01}
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
export default BeersFilterAbv;
