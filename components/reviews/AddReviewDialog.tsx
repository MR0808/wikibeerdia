import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

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
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import { AddFormTextArea } from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import { ReviewSchema } from "@/schemas/reviews";
import { createBreweryReview } from "@/actions/breweries";
import { BreweryReviewsType } from "@/types/breweries";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AddReviewDialogProps {
    openAddReview: boolean;
    setOpenAddReview: Dispatch<SetStateAction<boolean>>;
    id: string;
    type: "brewery" | "beer";
    refreshReviewsOnSubmit: (breweryReview: BreweryReviewsType) => void;
}

const AddReviewDialog = ({
    openAddReview,
    setOpenAddReview,
    id,
    type,
    refreshReviewsOnSubmit
}: AddReviewDialogProps) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);
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
                setSuccess(true);
                form.reset();
                refreshReviewsOnSubmit(data.data);
            }
        });
    };

    const closeDialog = () => {
        setOpenAddReview(false);
        setSuccess(false);
        form.reset();
    };

    return (
        <Dialog
            open={openAddReview}
            onOpenChange={() => {
                form.reset();
                setSuccess(false);
                setOpenAddReview((prevOpen) => !prevOpen);
            }}
        >
            <DialogContent
                className={cn(
                    "mx-4 max-w-[700px] overflow-hidden p-0 sm:mx-6 md:mx-8 lg:mx-10"
                )}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                {success ? (
                    <>
                        <DialogHeader className="border-b px-6 pb-4 pt-8">
                            <DialogTitle className="text-left text-3xl font-bold">
                                Add Review
                            </DialogTitle>
                        </DialogHeader>
                        <div className="px-6">Thanks for your review!</div>
                        <DialogFooter className="px-6 py-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                className={cn("capitalize")}
                                size="lg"
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <Form {...form}>
                        <FormError message={error} />
                        <form
                            className="w-full space-y-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <DialogHeader className="border-b px-6 pb-4 pt-8">
                                <DialogTitle className="text-left text-3xl font-bold">
                                    Add Review
                                </DialogTitle>
                            </DialogHeader>
                            <div className="px-6">
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="hidden"
                                                    {...field}
                                                />
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
                                                    className={cn("capitalize")}
                                                >
                                                    Rating
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
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
                                                        {numbers.map(
                                                            (number) => {
                                                                return (
                                                                    <SelectItem
                                                                        value={
                                                                            number
                                                                        }
                                                                        key={
                                                                            number
                                                                        }
                                                                    >
                                                                        {`${number} stars`}
                                                                    </SelectItem>
                                                                );
                                                            }
                                                        )}
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
                            </div>

                            <DialogFooter className="px-6 py-4">
                                <SubmitButton isPending={isPending} />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeDialog}
                                    className={cn("capitalize")}
                                    size="lg"
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
};
export default AddReviewDialog;
