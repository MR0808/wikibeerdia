import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, Dispatch, SetStateAction } from "react";
import { ReportTypes } from '@/generated/prisma/client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SubmitButton } from "@/components/form/Buttons";
import { AddFormTextArea } from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import { ReportSchema } from "@/schemas/reports";
import { createReport } from "@/actions/reports";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AddReportDialogProps {
    id: string;
    type: ReportTypes;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface ReportFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
    type: ReportTypes;
}

const AddReportDialog = ({ id, type, open, setOpen }: AddReportDialogProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="border-b px-6 pb-4 pt-8">
                        <DialogTitle className="text-left text-3xl font-bold">
                            Add Report
                        </DialogTitle>
                        <DialogDescription>
                            Please let us know what is wrong and we'll action it
                            as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <ReportForm setOpen={setOpen} id={id} type={type} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="mb-4 border-b px-6 pb-4 pt-8">
                    <DrawerTitle className="text-left text-2xl font-bold">
                        Add Report
                    </DrawerTitle>
                    <DrawerDescription>
                        Please let us know what is wrong and we'll action it as
                        soon as possible.
                    </DrawerDescription>
                </DrawerHeader>
                <ReportForm setOpen={setOpen} id={id} type={type} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

const ReportForm = ({ setOpen, id, type }: ReportFormProps) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ReportSchema>>({
        resolver: zodResolver(ReportSchema),
        defaultValues: {
            comment: "",
            id,
            type
        }
    });

    const onSubmit = (values: z.infer<typeof ReportSchema>) => {
        console.log("here");
        startTransition(async () => {
            const data = await createReport(values);

            if (data?.error) {
                setError(data.error);
            }

            if (data?.data) {
                setSuccess(true);
                form.reset();
            }
        });
    };

    const errorClass = "pl-6";

    return (
        <>
            {success ? (
                <div>
                    Thank you for submitting your report. We will review it and
                    action where necessary
                </div>
            ) : (
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
                                name="type"
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
                                name="comment"
                                render={({ field }) => (
                                    <FormItem className={cn("w-full")}>
                                        <div className="mb-2">
                                            <FormLabel
                                                className={cn(
                                                    "block text-lg font-medium leading-6 text-gray-900"
                                                )}
                                            >
                                                Report
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
                        <div className="mt-auto flex flex-col gap-2 p-4 pt-2">
                            <SubmitButton
                                isPending={isPending}
                                className="w-full"
                            />
                        </div>
                    </form>
                </Form>
            )}
        </>
    );
};

export default AddReportDialog;
