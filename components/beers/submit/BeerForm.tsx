"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import type { Session } from "next-auth";

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
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    AddFormInput,
    AddFormTextArea,
    AddFormSliderInput
} from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { BeerSchema } from "@/schemas/beer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BreweriesForm, ParentStylesForm, StylesForm } from "@/types/beers";
import { getBeerStylesForm } from "@/actions/beerStyles";
import getYear from "@/utils/getYear";
import { createBeer, createBeerImages } from "@/actions/beers";
import { ImagesUpload } from "@/types/global";
import { uploadImage } from "@/utils/supabase";
import BeerImagesUpload from "./BeerImagesUpload";

type Props = {
    breweryId?: string;
    session: Session | null;
    breweries: BreweriesForm[];
    parentStyles: ParentStylesForm[];
    styles: StylesForm[];
};

const BeerForm = ({ breweryId, breweries, parentStyles, styles }: Props) => {
    const [error, setError] = useState<string | undefined>();
    const [ibuValue, setIbuValue] = useState(60);
    const [abvValue, setAbvValue] = useState(10);
    const [isPending, startTransition] = useTransition();
    const [openBreweries, setOpenBreweries] = useState(false);
    const [openParentStyles, setOpenParentStyles] = useState(false);
    const [openStyles, setOpenStyles] = useState(false);
    const [stylesList, setStylesList] = useState<StylesForm[]>(styles);

    const errorClass = "pl-6";

    const onIbuSliderChange = (value: number[]) => {
        setIbuValue(value[0]);
        form.setValue("ibu", value[0]);
    };

    const onIbuInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= 120) {
            setIbuValue(value);
            form.setValue("ibu", value);
        }
    };

    const onAbvSliderChange = (value: number[]) => {
        setAbvValue(value[0]);
        form.setValue("abv", value[0]);
    };

    const onAbvInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= 20) {
            setAbvValue(value);
            form.setValue("abv", value);
        }
    };

    const year = getYear();
    const years = Array.from(new Array(100), (val, index) => year - index);

    const form = useForm<z.infer<typeof BeerSchema>>({
        resolver: zodResolver(BeerSchema),
        defaultValues: {
            name: "",
            headline: "",
            description: "",
            abv: abvValue,
            ibu: ibuValue,
            year: "",
            available: true,
            parentStyle: parentStyles[0].id,
            subStyle: "",
            brewery: breweryId || ""
        }
    });

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const result = await getBeerStylesForm(
                    form.getValues("parentStyle")
                );
                form.setValue("subStyle", "");
                setStylesList(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchStyles();
    }, [form.watch("parentStyle")]);

    const getStyleName = (subStyleId: string) => {
        let name = "";
        stylesList.map((style) => {
            const sub = style.subStyles.find(
                (subStyle) => subStyle.id === subStyleId
            );
            if (sub) {
                name = sub.name;
            }
        });
        return name;
    };

    useEffect(() => {
        console.log(form.formState.errors);
    }, [form.formState.errors]);

    const onSubmit = (values: z.infer<typeof BeerSchema>) => {
        startTransition(async () => {
            const images: ImagesUpload[] = [];

            if (values.images) {
                let order = 1;
                for (const imageItem of values.images) {
                    const image = await uploadImage(
                        imageItem.value,
                        "images-bucket"
                    );
                    images.push({ image, order });
                    order++;
                }
            }
            await createBeerImages(images);
            const formData = { ...values, images };
            createBeer(formData);
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
                <div className="form-card">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                        Beer Attributes
                    </h1>
                    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full grid grid-cols-2 gap-x-16">
                            <FormField
                                control={form.control}
                                name="parentStyle"
                                render={({ field }) => (
                                    <FormItem
                                        className={cn("flex w-full flex-col")}
                                    >
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Primary Style
                                        </FormLabel>
                                        <Popover
                                            open={openParentStyles}
                                            onOpenChange={setOpenParentStyles}
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
                                                            ? parentStyles.find(
                                                                  (
                                                                      parentStyle
                                                                  ) =>
                                                                      parentStyle.id ===
                                                                      field.value
                                                              )?.name
                                                            : "Select primary style"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="popover-content-width-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search primary styles..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No primary styles
                                                            found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {parentStyles.map(
                                                                (
                                                                    parentStyle
                                                                ) => (
                                                                    <CommandItem
                                                                        value={
                                                                            parentStyle.name
                                                                        }
                                                                        key={
                                                                            parentStyle.id
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "parentStyle",
                                                                                parentStyle.id
                                                                            );
                                                                            setOpenParentStyles(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            parentStyle.name
                                                                        }
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                parentStyle.id ===
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
                            <FormField
                                control={form.control}
                                name="subStyle"
                                render={({ field }) => (
                                    <FormItem
                                        className={cn("flex w-full flex-col")}
                                    >
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Style
                                        </FormLabel>
                                        <Popover
                                            open={openStyles}
                                            onOpenChange={setOpenStyles}
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
                                                            ? getStyleName(
                                                                  field.value
                                                              )
                                                            : "Select style"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="popover-content-width-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search styles..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No primary styles
                                                            found.
                                                        </CommandEmpty>
                                                        {stylesList.map(
                                                            (style) => (
                                                                <CommandGroup
                                                                    heading={
                                                                        style.name
                                                                    }
                                                                    key={
                                                                        style.id
                                                                    }
                                                                >
                                                                    {style.subStyles.map(
                                                                        (
                                                                            subStyle
                                                                        ) => (
                                                                            <CommandItem
                                                                                value={
                                                                                    subStyle.name
                                                                                }
                                                                                key={
                                                                                    subStyle.id
                                                                                }
                                                                                onSelect={() => {
                                                                                    form.setValue(
                                                                                        "subStyle",
                                                                                        subStyle.id
                                                                                    );
                                                                                    setOpenStyles(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {
                                                                                    subStyle.name
                                                                                }
                                                                                <CheckIcon
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        subStyle.id ===
                                                                                            field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        )
                                                                    )}
                                                                </CommandGroup>
                                                            )
                                                        )}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full grid grid-cols-2 gap-x-16">
                            <FormField
                                control={form.control}
                                name="ibu"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            IBU
                                        </FormLabel>
                                        <div className="mx-auto flex w-full justify-center">
                                            <AddFormSliderInput
                                                type="number"
                                                {...field}
                                                min={0}
                                                max={120}
                                                step={1}
                                                value={ibuValue}
                                                onChange={onIbuInputChange}
                                            />
                                        </div>
                                        <FormControl>
                                            <Slider
                                                min={0}
                                                max={120}
                                                step={1}
                                                defaultValue={[field.value]}
                                                value={[ibuValue]}
                                                onValueChange={
                                                    onIbuSliderChange
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="abv"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            ABV
                                        </FormLabel>
                                        <div className="mx-auto flex w-full justify-center">
                                            <AddFormSliderInput
                                                type="number"
                                                {...field}
                                                min={0}
                                                max={20}
                                                step={0.01}
                                                value={abvValue}
                                                onChange={onAbvInputChange}
                                            />
                                        </div>
                                        <FormControl>
                                            <Slider
                                                min={0}
                                                max={20}
                                                step={0.01}
                                                defaultValue={[field.value]}
                                                value={[abvValue]}
                                                onValueChange={
                                                    onAbvSliderChange
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full grid grid-cols-2 gap-x-16">
                            <div className="flex flex-col space-y-1">
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={cn(
                                                    "block text-lg font-medium leading-6 text-gray-900"
                                                )}
                                            >
                                                Year Created (if known)
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={cn(
                                                            "h-14 w-full"
                                                        )}
                                                    >
                                                        <SelectValue placeholder="Select a created year" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {years.map((year) => {
                                                        return (
                                                            <SelectItem
                                                                key={year}
                                                                value={year.toString()}
                                                            >
                                                                {year}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage
                                                className={errorClass}
                                            />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    className="cursor-pointer text-xs hover:underline"
                                    onClick={() => form.setValue("year", "")}
                                >
                                    Clear
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Still available?
                                        </FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(value === "true")
                                            }
                                            defaultValue={
                                                field.value ? "true" : "false"
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className={cn(
                                                        "h-14 w-full"
                                                    )}
                                                >
                                                    <SelectValue placeholder="Is the beer available?" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="true">
                                                    Yes
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    No
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-card">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                        Brewery Images
                    </h1>
                    <h3 className="text-lg leading-7 text-gray-900">
                        Maximum 15 images
                    </h3>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <BeerImagesUpload />
                        </div>
                    </div>
                </div>
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
