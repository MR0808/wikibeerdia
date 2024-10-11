"use client";

import * as z from "zod";
import { useFormContext, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImageUpIcon } from "lucide-react";

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BrewerySchema } from "@/schemas/brewery";
import { cn } from "@/lib/utils";

const BreweryLogoUpload = () => {
    const form = useFormContext<z.infer<typeof BrewerySchema>>();
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

    const errorClass = "pl-6";

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
        open
    } = useDropzone({
        onDrop,
        maxFiles: 10,
        maxSize: 10 * 1024 * 1024,
        accept: {
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
            "image/webp": []
        }
    });

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
        <>
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
                                            isDragActive && !isDragReject,
                                        "border-destructive bg-destructive/10":
                                            isDragActive && isDragReject,
                                        "border-border bg-card": !isDragActive
                                    }
                                )}
                                {...getRootProps()}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <input {...getInputProps()} id="logoUrl" />
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
                                                fileRejections.length > 0,
                                            "text-muted-foreground":
                                                !isDragReject &&
                                                !(fileRejections.length > 0)
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
                            src={URL.createObjectURL(field.value)}
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
        </>
    );
};

export default BreweryLogoUpload;
