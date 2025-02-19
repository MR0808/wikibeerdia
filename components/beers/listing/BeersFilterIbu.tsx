"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FilterButton } from "@/components/form/Buttons";
import { Slider } from "@/components/ui/range-slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { BeerIbuSchema } from "@/schemas/beer";
import { BeersFilterIbuProps } from "@/types/beers";

const BeersFilterIbu = ({ ibu, setIbu, highestIbu }: BeersFilterIbuProps) => {
    let ibuArray = [0, highestIbu];
    if (ibu.length > 0) ibuArray = ibu;

    const formIbu = useForm<z.infer<typeof BeerIbuSchema>>({
        resolver: zodResolver(BeerIbuSchema),
        defaultValues: {
            ibu: ibuArray
        }
    });

    const onSubmitIbu = (values: z.infer<typeof BeerIbuSchema>) => {
        setIbu(values.ibu);
    };

    const onIbuReset = () => {
        setIbu([]);
        formIbu.reset();
    };

    useEffect(() => {
        if (
            JSON.stringify(ibu) === JSON.stringify([0, highestIbu]) ||
            ibu.length === 0
        )
            formIbu.reset();
    }, [ibu]);

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="py-4 text-xl font-bold text-black/80">
                IBU Range
            </div>
            {ibuArray.length > 0 &&
                JSON.stringify(ibuArray) !==
                    JSON.stringify([0, highestIbu]) && (
                    <div
                        className="cursor-pointer pb-2 text-sm hover:underline"
                        onClick={onIbuReset}
                    >
                        Clear
                    </div>
                )}
            <Form {...formIbu}>
                <form
                    className="flex w-full flex-col justify-start space-y-5"
                    onSubmit={formIbu.handleSubmit(onSubmitIbu)}
                >
                    <FormField
                        control={formIbu.control}
                        name="ibu"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="w-full pt-3">
                                        <Slider
                                            min={0}
                                            max={highestIbu}
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
export default BeersFilterIbu;
