"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { BlogVoteSchema } from "@/schemas/blog";
import { SubmitButton } from "@/components/form/Buttons";
import { createBlogVote } from "@/actions/blogs";

export const BlogRating = ({ slug }: { slug: string }) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof BlogVoteSchema>>({
        resolver: zodResolver(BlogVoteSchema),
        defaultValues: {
            vote: undefined
        }
    });

    const onSubmit = (values: z.infer<typeof BlogVoteSchema>) => {
        startTransition(async () => {
            const vote = Number(values.vote);
            await createBlogVote(slug, vote);

            toast.success("Review added");
        });
    };

    const numbers = Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        return value.toString();
    }).reverse();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row space-x-3">
                    <FormField
                        control={form.control}
                        name="vote"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Rate Blog" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {numbers.map((number) => {
                                            return (
                                                <SelectItem
                                                    value={number}
                                                    key={number}
                                                >
                                                    {`${number} stars`}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <SubmitButton isPending={isPending} size="default" />
                </div>
            </form>
        </Form>
    );
};
