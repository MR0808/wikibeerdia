"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useState, useTransition, useCallback, useEffect, useRef } from "react";
import type { Session } from "next-auth";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImageUpIcon } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { BrewerySchema } from "@/schemas/brewery";
import { cn } from "@/lib/utils";
import { BreweryTypeForm } from "@/types/breweryTypes";
import Autocomplete from "@/components/autocomplete/Autocomplete";

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
            logoUrl: []
        }
    });
    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage
    } = useFieldArray({
        name: "logoUrl",
        control: form.control
    });
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            appendImage(acceptedFiles.map((file) => ({ value: file })));
            await form.trigger("logoUrl");
        },
        [form]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
        open
    } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
        accept: {
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
            "image/webp": []
        }
    });

    const onSubmit = (values: z.infer<typeof BrewerySchema>) => {
        console.log(values);
        startTransition(() => {});
    };

    useEffect(() => {
        if (fileRejections.length > 0) {
            const errorType = fileRejections[0].errors[0].code;
            if (errorType === "file-invalid-type") {
                toast.error("Wrong file type", {
                    description: "Please upload a file with the correct format"
                });
            } else if (errorType === "file-too-large") {
                toast.error("File too large", {
                    description: "Please upload a file with the correct size"
                });
            } else {
                toast.error("Uh oh! Something went wrong.", {
                    description:
                        "There was a problem with your request. Please try again"
                });
            }
        }
    }, [fileRejections]);

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
                            <FormField
                                control={form.control}
                                name="logoUrl"
                                render={() => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "block text-lg font-medium leading-6 text-gray-900"
                                            )}
                                        >
                                            Brewery Logo
                                        </FormLabel>
                                        <FormControl>
                                            <div
                                                className={cn(
                                                    `relative flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-10 ${imageFields.length > 0 && "hidden"}`,
                                                    {
                                                        "border-green-500 bg-green-500/10":
                                                            isDragActive &&
                                                            !isDragReject,
                                                        "border-destructive bg-destructive/10":
                                                            isDragActive &&
                                                            isDragReject,
                                                        "border-border bg-card":
                                                            !isDragActive
                                                    }
                                                )}
                                                {...getRootProps()}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <input
                                                    {...getInputProps()}
                                                    id="logoUrl"
                                                />
                                                <ImageUpIcon className="h-12 w-12 fill-primary/75" />
                                                <div className="mb-2 mt-4">
                                                    Drop or{" "}
                                                    <span
                                                        onClick={() => open()}
                                                        className="cursor-pointer text-primary hover:underline"
                                                    >
                                                        select
                                                    </span>
                                                </div>
                                                <span
                                                    className={cn(
                                                        "absolute bottom-2 left-1/2 -translate-x-1/2 text-xs",
                                                        {
                                                            "text-destructive":
                                                                isDragReject ||
                                                                fileRejections.length >
                                                                    0,
                                                            "text-muted-foreground":
                                                                !isDragReject &&
                                                                !(
                                                                    fileRejections.length >
                                                                    0
                                                                )
                                                        }
                                                    )}
                                                >
                                                    Max size: 25MB, JPG or PNG
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-2 grid grid-cols-5 gap-2">
                                {imageFields.map((field, index) => (
                                    <div key={field.id} className="space-y-2">
                                        <Image
                                            src={URL.createObjectURL(
                                                field.value
                                            )}
                                            alt="Brewery Logo"
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            className="h-auto w-full"
                                            priority={true}
                                            // className="h-[100px] rounded-sm"
                                        />
                                        <Button
                                            variant="destructive"
                                            onClick={() => removeImage(index)}
                                            type="button"
                                            className="w-full"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
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
            </form>
        </Form>
    );
};

export default BreweryForm;
