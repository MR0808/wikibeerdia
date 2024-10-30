"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { SubmitButton } from "@/components/form/Buttons";
import { AddFormTextArea } from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewSchema } from "@/schemas/reviews";
import { createBreweryReview } from "@/actions/breweries";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Props = {
    id: string;
    type: "brewery" | "beer";
    refreshReviewsOnSubmit: () => void;
};

const SubmitReview = ({ id, type, refreshReviewsOnSubmit }: Props) => {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const errorClass = "pl-6";

    const numbers = Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        return value.toString();
    }).reverse();

    const form = useForm<z.infer<typeof ReviewSchema>>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            rating: "5",
            comment: "",
            id
        }
    });

    const onSubmit = (values: z.infer<typeof ReviewSchema>) => {
        startTransition(async () => {
            const data = await createBreweryReview(values);

            if (data?.error) {
                setError(data.error);
            }

            if (data?.data) {
                toast.success("Review successfully submitted");
                form.reset();
                refreshReviewsOnSubmit();
                setIsReviewFormVisible(false);
            }
        });
    };
    return (
        <div>
            <Button
                size="lg"
                className="capitalize"
                onClick={() => setIsReviewFormVisible((prev) => !prev)}
            >
                leave review
            </Button>
            {isReviewFormVisible && (
                <Card className="mt-8 p-8">
                    <Form {...form}>
                        <FormError message={error} />
                        <form
                            className="w-full space-y-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <FormControl>
                                            <Input type="hidden" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <div className="mb-2 max-w-xs">
                                            <FormLabel
                                                className={cn("capitalize")}
                                            >
                                                Rating
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <div className="mt-2">
                                                        <SelectTrigger className="h-14 w-full rounded-lg border-neutral-200 bg-white px-5">
                                                            <SelectValue placeholder="Rating" />
                                                        </SelectTrigger>
                                                    </div>
                                                </FormControl>
                                                <SelectContent>
                                                    {numbers.map((number) => {
                                                        return (
                                                            <SelectItem
                                                                value={number}
                                                                key={number}
                                                            >
                                                                {number}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage
                                                className={errorClass}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <div className="mb-2">
                                            <FormLabel
                                                className={cn(
                                                    "block text-lg font-medium leading-6 text-gray-900"
                                                )}
                                            >
                                                Review
                                            </FormLabel>
                                            <FormControl>
                                                <div className="mt-2">
                                                    <AddFormTextArea
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage
                                                className={errorClass}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <SubmitButton
                                isPending={isPending}
                                className="mt-4"
                            />
                        </form>
                    </Form>
                </Card>
            )}
        </div>
    );
};

export default SubmitReview;
