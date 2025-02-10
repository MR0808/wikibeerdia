"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { AddFormInput, AddFormTextArea } from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { BreweryEditSchema } from "@/schemas/brewery";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BreweryType } from "@/types/breweries";
import { BreweryTypeForm } from "@/types/breweryTypes";
import { updateBrewery } from "@/actions/breweries";
import Autocomplete from "@/components/autocomplete/Autocomplete";

type Props = {
    data: BreweryType;
    session: Session | null;
    breweryTypes: BreweryTypeForm[];
};

const BreweryEditForm = ({ data, session, breweryTypes }: Props) => {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const errorClass = "pl-6";

    const form = useForm<z.infer<typeof BreweryEditSchema>>({
        resolver: zodResolver(BreweryEditSchema),
        defaultValues: {
            breweryType: data.breweryTypeId,
            name: data.name,
            description: data.description,
            headline: data.headline,
            website: data.website,
            address1: data.address1,
            address2: data.address2 || "",
            region: data.region,
            postalCode: data.postalCode,
            country: data.country.name,
            city: data.city,
            formattedAddress: data.formattedAddress,
            countryCode: data.country.isoCode,
            latitude: 0,
            longitude: 0
        }
    });

    const addressData = {
        address1: data.address1,
        address2: data.address2 || "",
        formattedAddress: data.formattedAddress,
        city: data.city,
        region: data.region,
        postalCode: data.postalCode,
        country: data.country.name,
        lat: 0,
        lng: 0,
        countryCode: data.country.isoCode
    };

    const onSubmit = (values: z.infer<typeof BreweryEditSchema>) => {
        startTransition(async () => {
            const results = await updateBrewery(values, data.id);
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
                    <h1 className="text-2xl leading-7 font-semibold text-gray-900">
                        Brewery Overview
                    </h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Brewery Name
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="text"
                                                placeholder="Brewery name"
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
                                                "block text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Description of brewery
                                        </FormLabel>
                                        <FormControl>
                                            <div className="mt-2">
                                                <AddFormTextArea {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Write a few sentences about the
                                            brewery.
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
                                                "block text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Brewery Headline - a one liner that
                                            describes the brewery perfectly
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="text"
                                                placeholder="Brewery headline"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full grid grid-cols-2 gap-x-6">
                            <FormField
                                control={form.control}
                                name="breweryType"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Brewery Type
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <div className="mt-2">
                                                    <SelectTrigger className="h-14 w-full rounded-lg border-neutral-200 bg-white px-5">
                                                        <SelectValue placeholder="Select a brewery type" />
                                                    </SelectTrigger>
                                                </div>
                                            </FormControl>
                                            <SelectContent>
                                                {breweryTypes.map((type) => {
                                                    return (
                                                        <SelectItem
                                                            value={type.id}
                                                            key={type.id}
                                                        >
                                                            {type.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Website
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="text"
                                                placeholder="http://..."
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
                    <h1 className="text-2xl leading-7 font-semibold text-gray-900">
                        Brewery Address
                    </h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <Autocomplete addressData={addressData} />
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

export default BreweryEditForm;
