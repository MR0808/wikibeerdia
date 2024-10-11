"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { AddFormInput, AddFormTextArea } from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { BrewerySchema } from "@/schemas/brewery";
import { cn } from "@/lib/utils";
import { BreweryTypeForm } from "@/types/breweryTypes";
import Autocomplete from "@/components/autocomplete/Autocomplete";
import BreweryLogoUpload from "./BreweryLogoUpload";
import BreweryImagesUpload from "./BreweryImagesUpload";

type Props = {
    id?: string;
    edit: boolean;
    session: Session | null;
    breweryTypes: BreweryTypeForm[];
};

const BreweryForm = ({ id, edit, session, breweryTypes }: Props) => {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const errorClass = "pl-6";

    const form = useForm<z.infer<typeof BrewerySchema>>({
        resolver: zodResolver(BrewerySchema),
        defaultValues: {
            breweryType: "",
            name: "",
            description: "",
            website: "",
            logoUrl: [],
            address1: "",
            address2: "",
            region: "",
            postalCode: "",
            country: "",
            city: "",
            formattedAddress: "",
            countryCode: ""
        }
    });

    const onSubmit = (values: z.infer<typeof BrewerySchema>) => {
        console.log(values);
        startTransition(() => {});
    };

    return (
        <Form {...form}>
            <FormError message={error} />
            <form
                className="w-full space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="mx-auto mb-10 flex w-[55%] flex-col justify-between space-y-12 rounded-3xl bg-violet-50 px-12 py-10 sm:justify-between sm:space-x-0 md:space-x-4">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
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
                                                "block text-lg font-medium leading-6 text-gray-900"
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
                                                "block text-lg font-medium leading-6 text-gray-900"
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
                        <div className="col-span-full grid grid-cols-2 gap-x-6">
                            <FormField
                                control={form.control}
                                name="breweryType"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
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
                                                "block text-lg font-medium leading-6 text-gray-900"
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
                        <div className="col-span-full">
                            <BreweryLogoUpload />
                        </div>
                    </div>
                </div>
                <div className="mx-auto mb-10 flex w-[55%] flex-col justify-between space-y-12 rounded-3xl bg-violet-50 px-12 py-10 sm:justify-between sm:space-x-0 md:space-x-4">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                        Brewery Address
                    </h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <Autocomplete />
                        </div>
                    </div>
                </div>
                <div className="mx-auto mb-10 flex w-[55%] flex-col justify-between space-y-12 rounded-3xl bg-violet-50 px-12 py-10 sm:justify-between sm:space-x-0 md:space-x-4">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                        Brewery Address
                    </h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <BreweryImagesUpload />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default BreweryForm;
