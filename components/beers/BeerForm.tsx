"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import type { Session } from "next-auth";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { AddFormInput, AddFormTextArea } from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { BeerSchema } from "@/schemas/beer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BreweriesForm } from "@/types/beers";
import getYear from "@/utils/getYear";

type Props = {
    breweryId?: string;
    session: Session | null;
    breweries: BreweriesForm[];
};

const BeerForm = ({ breweryId, session, breweries }: Props) => {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const errorClass = "pl-6";

    const year = getYear();

    const form = useForm<z.infer<typeof BeerSchema>>({
        resolver: zodResolver(BeerSchema),
        defaultValues: {
            name: "",
            headline: "",
            description: "",
            abv: "",
            ibu: "",
            year: year,
            available: true,
            parentStyle: "",
            style: "",
            subStyle: "",
            brewery: breweryId || ""
        }
    });

    const onSubmit = (values: z.infer<typeof BeerSchema>) => {
        startTransition(() => {
            // const formData = new FormData();
            // formData.append("logoUrl", values.logoUrl[0].value);
            // values?.images?.map((image) => {
            //     formData.append("images", image.value);
            // });
            // formData.append("name", values.name);
            // formData.append("address1", values.address1);
            // formData.append("formattedAddress", values.formattedAddress);
            // formData.append("city", values.city);
            // formData.append("region", values.region);
            // formData.append("postalCode", values.postalCode);
            // formData.append("country", values.country);
            // formData.append("description", values.description);
            // formData.append("headline", values.headline);
            // formData.append("breweryType", values.breweryType);
            // formData.append("website", values.website);
            // values.address2 && formData.append("address2", values.address2);
            // values.countryCode &&
            //     formData.append("countryCode", values.countryCode);
            // createBrewery(formData);
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
                                            open={open}
                                            onOpenChange={setOpen}
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
                                                                            setOpen(
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
                                        <FormMessage />
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

                {/* <div className="mx-auto mb-10 flex w-[55%] flex-col justify-between space-y-12 rounded-3xl bg-violet-50 px-12 py-10 sm:justify-between sm:space-x-0 md:space-x-4">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                        Brewery Images
                    </h1>
                    <h3 className="text-lg leading-7 text-gray-900">
                        Maximum 15 images
                    </h3>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <BreweryImagesUpload />
                        </div>
                    </div>
                </div> */}
                <div className="mx-auto mb-10 flex w-[55%] flex-row justify-end px-12 pb-16 sm:space-x-0 md:space-x-4">
                    <Link href="/">
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

export default BeerForm;
