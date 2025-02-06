"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BreweriesFilterProps } from "@/types/breweries";
import { cn } from "@/lib/utils";
import { BrewerySearchSchema } from "@/schemas/brewery";
import { Button } from "@/components/ui/button";
import { useBreweriesParams } from "@/hooks/useBreweriesParams";
import { useEffect } from "react";

const BreweriesFilter = ({
    params,
    filters,
    setCountry,
    setSearch,
    setType,
    nuqsCountry,
    search,
    type,
    isPending
}: BreweriesFilterProps) => {
    // const {
    //     setSearch,
    //     search,
    //     country: nuqsCountry,
    //     setCountry
    // } = useBreweriesParams();

    const form = useForm<z.infer<typeof BrewerySearchSchema>>({
        resolver: zodResolver(BrewerySearchSchema),
        defaultValues: {
            search: params.search || ""
        }
    });

    const onSubmit = (values: z.infer<typeof BrewerySearchSchema>) => {
        setSearch(values.search);
    };

    useEffect(() => {
        form.setValue("search", search);
    }, [search]);

    const handleCountryChange = (countryChecked: string, checked: boolean) => {
        let newCountries = nuqsCountry;
        if (checked) {
            newCountries = [...newCountries, countryChecked];
        } else {
            newCountries = newCountries.filter((c) => c !== countryChecked);
        }
        setCountry(newCountries);
    };

    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
                <div className="mb-4 text-xl font-bold text-black/80">
                    Keywords
                </div>
                <Form {...form}>
                    <form
                        className="flex w-full flex-row items-center justify-between space-x-4 border border-gray-300 p-3"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem className={cn("space-y-0")}>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Search..."
                                            className={cn(
                                                "h-9 w-full rounded-none border-0 text-lg text-black shadow-none focus-visible:ring-0"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className={cn("size-10 cursor-pointer p-0")}
                        >
                            <Search />
                        </Button>
                    </form>
                </Form>
            </div>
            {filters && (
                <div>
                    <Accordion type="multiple">
                        <AccordionItem value="countries">
                            <AccordionTrigger className="mb-1 text-xl font-bold text-black/80">
                                Location
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="flex flex-col space-y-4">
                                    {filters.countries.map((country) => {
                                        return (
                                            <div
                                                key={country.name}
                                                className="items-top flex space-x-2"
                                            >
                                                <Checkbox
                                                    id={country.name}
                                                    checked={nuqsCountry.includes(
                                                        country.name
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleCountryChange(
                                                            country.name,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor={country.id}
                                                        className="leading-none font-medium"
                                                    >
                                                        {`${country.name} (${country.count})`}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </div>
    );
};

export default BreweriesFilter;
