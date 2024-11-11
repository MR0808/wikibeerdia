"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerTrigger
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import { AddFormTextArea } from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import { ReviewSchema } from "@/schemas/reviews";
import { createBreweryReview } from "@/actions/breweries";
import { ReviewsType } from "@/types/breweries";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AddReviewDialogProps {
    id: string;
    type: "brewery" | "beer";
    refreshReviewsOnSubmit: (breweryReview: ReviewsType) => void;
}

interface ReviewFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
    type: "brewery" | "beer";
    refreshReviewsOnSubmit: (breweryReview: ReviewsType) => void;
}

const AddReviewDialog = ({
    id,
    type,
    refreshReviewsOnSubmit
}: AddReviewDialogProps) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Add Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="border-b px-6 pb-4 pt-8">
                        <DialogTitle className="text-left text-3xl font-bold">
                            Add Review
                        </DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <ReviewForm
                        setOpen={setOpen}
                        id={id}
                        type={type}
                        refreshReviewsOnSubmit={refreshReviewsOnSubmit}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button>Add Review</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="mb-4 border-b px-6 pb-4 pt-8">
                    <DrawerTitle className="text-left text-2xl font-bold">
                        Add Review
                    </DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>
                <ReviewForm
                    setOpen={setOpen}
                    id={id}
                    type={type}
                    refreshReviewsOnSubmit={refreshReviewsOnSubmit}
                />

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

const ReviewForm = ({
    setOpen,
    id,
    type,
    refreshReviewsOnSubmit
}: ReviewFormProps) => {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

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
                toast.success("Review added");
                setOpen(false);
                form.reset();
                refreshReviewsOnSubmit(data.data);
            }
        });
    };

    const errorClass = "pl-6";
    const numbers = Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        return value.toString();
    }).reverse();

    return (
        <Form {...form}>
            <FormError message={error} />
            <form
                className="w-full space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="px-6">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
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
                                <div className="mb-2 w-full">
                                    <FormLabel
                                        className={cn(
                                            "block text-lg font-medium leading-6 text-gray-900"
                                        )}
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
                                                        {`${number} stars`}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className={errorClass} />
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
                                            <AddFormTextArea {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage className={errorClass} />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mt-auto flex flex-col gap-2 p-4 pt-2">
                    <SubmitButton isPending={isPending} className="w-full" />
                </div>
            </form>
        </Form>
    );
};

export default AddReviewDialog;
