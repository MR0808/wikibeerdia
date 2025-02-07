"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { Star } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion-filter";
import { FilterButton } from "@/components/form/Buttons";

import { Slider } from "@/components/ui/range-slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BreweriesFilterProps, IdNameFilter } from "@/types/breweries";
import { cn } from "@/lib/utils";
import { BrewerySearchSchema, BreweryBeersSchema } from "@/schemas/brewery";
import { Button } from "@/components/ui/button";

const BreweriesFilter = ({
    params,
    filters,
    setCountry,
    setSearch,
    setType,
    setBeers,
    nuqsCountry,
    search,
    beers,
    type,
    highestBeers
}: BreweriesFilterProps) => {
    let group1: IdNameFilter[] = [];
    let group2: IdNameFilter[] = [];

    if (filters) {
        group1 = filters.countries
            .filter((country) => nuqsCountry.includes(country.name))
            .sort((a, b) => a.name.localeCompare(b.name));

        group2 = filters.countries
            .filter((country) => !nuqsCountry.includes(country.name))
            .sort((a, b) => {
                if (a.count > 0 && b.count === 0) return -1;
                if (a.count === 0 && b.count > 0) return 1;
                return a.name.localeCompare(b.name);
            });
    }

    const formSearch = useForm<z.infer<typeof BrewerySearchSchema>>({
        resolver: zodResolver(BrewerySearchSchema),
        defaultValues: {
            search: params.search || ""
        }
    });

    const onSubmitSearch = (values: z.infer<typeof BrewerySearchSchema>) => {
        setSearch(values.search);
    };

    const onBeersReset = () => {
        setBeers([]);
        formBeers.reset();
    };

    let beersArray = [0, highestBeers];
    if (beers.length > 0) beersArray = beers;

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
        formSearch.setValue("search", search);
    }, [search]);

    useEffect(() => {
        if (
            JSON.stringify(beers) === JSON.stringify([0, 10]) ||
            beers.length === 0
        )
            formBeers.reset();
    }, [beers]);

    const handleCountryChange = (countryChecked: string, checked: boolean) => {
        let newCountries = nuqsCountry;
        if (checked) {
            newCountries = [...newCountries, countryChecked];
        } else {
            newCountries = newCountries.filter((c) => c !== countryChecked);
        }
        setCountry(newCountries);
    };

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
        <div className="rounded-3xl border border-black bg-white p-5">
            <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
                <div className="mb-4 text-xl font-bold text-black/80">
                    Keywords
                </div>
                <Form {...formSearch}>
                    <form
                        className="flex w-full flex-row items-center justify-between space-x-4 border border-gray-300 p-3"
                        onSubmit={formSearch.handleSubmit(onSubmitSearch)}
                    >
                        <FormField
                            control={formSearch.control}
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
                <>
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
                            {filters.breweryTypes.map((breweryType) => {
                                return (
                                    <div
                                        key={breweryType.name}
                                        className="items-top flex space-x-2"
                                    >
                                        <Checkbox
                                            id={breweryType.name}
                                            checked={type.includes(
                                                breweryType.name
                                            )}
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
                            {filters.breweryTypes.map((breweryType) => {
                                return (
                                    <div
                                        key={breweryType.name}
                                        className="items-top flex space-x-2"
                                    >
                                        <Checkbox
                                            id={breweryType.name}
                                            checked={type.includes(
                                                breweryType.name
                                            )}
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
                    <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
                        <div className="py-4 text-xl font-bold text-black/80">
                            Number of Beers
                        </div>
                        {beersArray.length > 0 &&
                            JSON.stringify(beersArray) !==
                                JSON.stringify([0, 10]) && (
                                <div
                                    className="cursor-pointer pb-2 text-sm hover:underline"
                                    onClick={onBeersReset}
                                >
                                    Clear
                                </div>
                            )}
                        <Form {...formSearch}>
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
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        className="w-full"
                                                    />
                                                    <div className="flex w-full flex-row justify-between pt-6 leading-none font-medium">
                                                        <span>
                                                            {field.value[0]}
                                                        </span>
                                                        <span>
                                                            {field.value[1]}
                                                        </span>
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
                    <Accordion type="multiple">
                        <AccordionItem value="countries">
                            <AccordionTrigger className="mb-1 text-xl font-bold text-black/80">
                                Location
                            </AccordionTrigger>
                            <AccordionContent>
                                <>
                                    {nuqsCountry.length > 0 ? (
                                        <>
                                            <div
                                                className="cursor-pointer pb-6 hover:underline"
                                                onClick={() => setCountry([])}
                                            >
                                                Clear
                                            </div>

                                            <div className="mb-6 flex flex-col space-y-4 border-b border-b-gray-200 pb-6">
                                                {group1.map((country) => {
                                                    return (
                                                        <div
                                                            key={country.name}
                                                            className="items-top flex space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={
                                                                    country.name
                                                                }
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
                                                                    htmlFor={
                                                                        country.name
                                                                    }
                                                                    className="leading-none font-medium"
                                                                >
                                                                    {`${country.name} (${country.count})`}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="flex flex-col space-y-4">
                                                {group2.map((country) => {
                                                    return (
                                                        <div
                                                            key={country.name}
                                                            className="items-top flex space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={
                                                                    country.name
                                                                }
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
                                                                    htmlFor={
                                                                        country.name
                                                                    }
                                                                    className="leading-none font-medium"
                                                                >
                                                                    {`${country.name} (${country.count})`}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col space-y-4">
                                            {filters.countries.map(
                                                (country) => {
                                                    return (
                                                        <div
                                                            key={country.name}
                                                            className="items-top flex space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={
                                                                    country.name
                                                                }
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
                                                                    htmlFor={
                                                                        country.name
                                                                    }
                                                                    className="leading-none font-medium"
                                                                >
                                                                    {`${country.name} (${country.count})`}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            )}
        </div>
    );
};

export default BreweriesFilter;
