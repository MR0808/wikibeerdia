"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import type { Session } from "next-auth";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { AddFormInput, AddFormTextArea } from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { BeerEditSchema } from "@/schemas/beer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    BeerType,
    BreweriesForm,
    ParentStylesForm,
    StylesForm
} from "@/types/beers";
import { BreweryTypeForm } from "@/types/breweryTypes";
import { updateBeer } from "@/actions/beers";
import Autocomplete from "@/components/autocomplete/Autocomplete";

type Props = {
    data: BeerType;
    session: Session | null;
    breweries: BreweriesForm[];
    parentStyles: ParentStylesForm[];
    beerStyles: StylesForm[];
};

const BeerEditForm = ({
    data,
    session,
    breweries,
    parentStyles,
    beerStyles
}: Props) => {
    const [error, setError] = useState<string | undefined>();
    const [ibuValue, setIbuValue] = useState(60);
    const [abvValue, setAbvValue] = useState(10);
    const [isPending, startTransition] = useTransition();
    const [openBreweries, setOpenBreweries] = useState(false);
    const [openParentStyles, setOpenParentStyles] = useState(false);
    const [openStyles, setOpenStyles] = useState(false);
    const [stylesList, setStylesList] = useState<StylesForm[]>(beerStyles);

    const errorClass = "pl-6";

    const form = useForm<z.infer<typeof BeerEditSchema>>({
        resolver: zodResolver(BeerEditSchema),
        defaultValues: {
            name: data.name,
            description: data.description,
            headline: data.headline,
            abv: parseInt(data.abv),
            ibu: data.ibu ? parseInt(data.ibu) : undefined,
            year: data.yearCreated ? data.yearCreated.toString() : undefined,
            available: data.available,
            subStyle: data.subStyleId || undefined,
            brewery: data.breweryId
        }
    });

    const onSubmit = (values: z.infer<typeof BeerEditSchema>) => {
        startTransition(async () => {
            const results = await updateBeer(values, data.id);
            if (results.error) {
                setError(results.error);
            }
        });
    };

    return (
        <Form {...form}>
            <FormError message={error} />
            <form
                className="w-full space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="form-card">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                        Beer Overview
                    </h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="brewery"
                                render={({ field }) => (
                                    <FormItem
                                        className={cn("flex w-full flex-col")}
                                    >
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Brewery
                                        </FormLabel>
                                        <Popover
                                            open={openBreweries}
                                            onOpenChange={setOpenBreweries}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "h-14 w-full justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? breweries.find(
                                                                  (brewery) =>
                                                                      brewery.id ===
                                                                      field.value
                                                              )?.name
                                                            : "Select brewery"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="popover-content-width-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search breweries..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No brewery found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {breweries.map(
                                                                (brewery) => (
                                                                    <CommandItem
                                                                        value={
                                                                            brewery.name
                                                                        }
                                                                        key={
                                                                            brewery.id
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "brewery",
                                                                                brewery.id
                                                                            );
                                                                            setOpenBreweries(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            brewery.name
                                                                        }
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                brewery.id ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Beer Name
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="text"
                                                placeholder="Beer name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Description of beer
                                        </FormLabel>
                                        <FormControl>
                                            <div className="mt-2">
                                                <AddFormTextArea {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Write a few sentences about the
                                            beer.
                                        </p>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Beer Headline - a one liner that
                                            describes the beer perfectly
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="text"
                                                placeholder="Beer headline"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto mb-10 flex w-[55%] flex-row justify-end px-12 pb-16 sm:space-x-0 md:space-x-4">
                    <Link href={`/breweries/${data.id}`}>
                        <Button type="button" variant="outline" size="lg">
                            Cancel
                        </Button>
                    </Link>
                    <SubmitButton isPending={isPending} />
                </div>
            </form>
        </Form>
    );
};

export default BeerEditForm;
