"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { AccountFormInput } from "@/components/form/FormInput";
import { FormErrorSubscribe } from "@/components/form/FormError";
import { FormSuccessSubscribe } from "@/components/form/FormSuccess";
import { EmailSchema } from "@/schemas/auth";
import { cn } from "@/lib/utils";
import { subscribeToNewsletter } from "@/actions/subscribe";

const FooterSubscribe = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(async () => {
            const data = await subscribeToNewsletter(values.email);

            if (!data) {
                setError("Failed to subscribe, please try again");
            }
            if (data) {
                form.reset();
                setSuccess("Successfully subscribed, welcome aboard");
            }
        });
    };

    return (
        <div className="flex flex-col">
            <Form {...form}>
                <form
                    className="flex w-full flex-row space-x-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={cn("w-full")}>
                                <FormControl>
                                    <AccountFormInput
                                        {...field}
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex-1">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className={cn("h-12 rounded-xl capitalize")}
                        >
                            {isPending ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                "Subscribe"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="flex flex-row gap-x-6">
                <div className="basis-full text-white">
                    <FormSuccessSubscribe message={success} />
                    <FormErrorSubscribe
                        message={error || form.formState.errors.email?.message}
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterSubscribe;
