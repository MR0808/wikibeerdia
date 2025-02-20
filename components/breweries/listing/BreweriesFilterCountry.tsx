"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { IdNameFilter } from "@/types/breweries";
import { BreweriesFilterCountryProps } from "@/types/breweries";

const BreweriesFilterCountry = ({
    country,
    setCountry,
    countries
}: BreweriesFilterCountryProps) => {
    let group1: IdNameFilter[] = [];
    let group2: IdNameFilter[] = [];

    if (countries) {
        group1 = countries
            .filter((item) => country.includes(item.name))
            .sort((a, b) => a.name.localeCompare(b.name));

        group2 = countries
            .filter((item) => !country.includes(item.name))
            .sort((a, b) => {
                if (a.count > 0 && b.count === 0) return -1;
                if (a.count === 0 && b.count > 0) return 1;
                return a.name.localeCompare(b.name);
            });
    }

    const handleCountryChange = (countryChecked: string, checked: boolean) => {
        let newCountries = country;
        if (checked) {
            newCountries = [...newCountries, countryChecked];
        } else {
            newCountries = newCountries.filter((c) => c !== countryChecked);
        }
        setCountry(newCountries);
    };
    return (
        <Accordion type="multiple">
            <AccordionItem value="countries">
                <AccordionTrigger className="mb-1 text-xl font-bold text-black/80">
                    Location
                </AccordionTrigger>
                <AccordionContent>
                    <>
                        {country.length > 0 ? (
                            <>
                                <div
                                    className="cursor-pointer pb-6 hover:underline"
                                    onClick={() => setCountry([])}
                                >
                                    Clear
                                </div>

                                <div className="mb-6 flex flex-col space-y-4 border-b border-b-gray-200 pb-6">
                                    {group1.map((item) => {
                                        return (
                                            <div
                                                key={item.name}
                                                className="items-top flex space-x-2"
                                            >
                                                <Checkbox
                                                    id={item.name}
                                                    checked={country.includes(
                                                        item.name
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleCountryChange(
                                                            item.name,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor={item.name}
                                                        className="leading-none font-medium"
                                                    >
                                                        {`${item.name} (${item.count})`}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col space-y-4">
                                    {group2.map((item) => {
                                        return (
                                            <div
                                                key={item.name}
                                                className="items-top flex space-x-2"
                                            >
                                                <Checkbox
                                                    id={item.name}
                                                    checked={country.includes(
                                                        item.name
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleCountryChange(
                                                            item.name,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor={item.name}
                                                        className="leading-none font-medium"
                                                    >
                                                        {`${item.name} (${item.count})`}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                {countries.map((item) => {
                                    return (
                                        <div
                                            key={item.name}
                                            className="items-top flex space-x-2"
                                        >
                                            <Checkbox
                                                id={item.name}
                                                checked={country.includes(
                                                    item.name
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleCountryChange(
                                                        item.name,
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor={item.name}
                                                    className="leading-none font-medium"
                                                >
                                                    {`${item.name} (${item.count})`}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
export default BreweriesFilterCountry;
