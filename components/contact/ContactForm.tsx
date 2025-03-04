"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { AddFormInput, AddFormTextArea } from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormError from "@/components/form/FormError";
import { ContactSchema } from "@/schemas/contact";
import { cn } from "@/lib/utils";
import { createContact } from "@/actions/contact";

const ContactForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            message: "",
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ContactSchema>) => {
        startTransition(async () => {
            const data = await createContact(values);
            if (data?.error) {
                setError(data.error);
            }
            if (data.data) {
                setSuccess(true);
                toast.success("Message submitted");
            }
        });
    };

    return !success ? (
        <Form {...form}>
            <FormError message={error} />
            <form
                className="my-auto flex h-full w-full items-center justify-center"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex h-full flex-col justify-between space-y-8 rounded-3xl bg-white px-12 py-5 align-middle shadow-md sm:justify-between sm:space-x-0 md:space-x-4">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "flex flex-row items-center justify-between align-middle text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Name
                                            <FormMessage />
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="text"
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "flex flex-row items-center justify-between align-middle text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Email
                                            <FormMessage />
                                        </FormLabel>
                                        <FormControl>
                                            <AddFormInput
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormLabel
                                            className={cn(
                                                "flex flex-row items-center justify-between align-middle text-lg leading-6 font-medium text-gray-900"
                                            )}
                                        >
                                            Message
                                            <FormMessage />
                                        </FormLabel>
                                        <FormControl>
                                            <div className="mt-2">
                                                <AddFormTextArea
                                                    {...field}
                                                    placeholder="What do you want to tell us..."
                                                />
                                            </div>
                                        </FormControl>
                                        <p className="mt-3 text-sm leading-6 text-gray-600"></p>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SubmitButton isPending={isPending} className="w-40" />
                    </div>
                </div>
            </form>
        </Form>
    ) : (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-full w-full flex-col justify-between space-y-8 rounded-3xl bg-white px-12 py-5 align-middle shadow-md sm:justify-between sm:space-x-0 md:space-x-4">
                Thank you for your message. We will endeavour to get back to you
                as soon as possible.
            </div>
        </div>
    );
};
export default ContactForm;
