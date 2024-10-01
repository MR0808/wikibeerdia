"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Status } from "@prisma/client";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
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
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select";

import { SubmitButton } from "@/components/form/Buttons";
import { AccountFormInput } from "@/components/form/FormInput";
import FormError from "@/components/form/FormError";
import {
    statusLabels,
    BreweryTypeProps,
    BreweryFormProps
} from "@/utils/types";
import { BreweryTypeSchema } from "@/schemas/admin";
import { addBreweryType, updateBreweryType } from "@/actions/admin";

const BreweryTypesDialog = ({ nameProp, statusProp, id }: BreweryTypeProps) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Brewery Type</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Brewery Type</DialogTitle>
                    </DialogHeader>
                    <BreweryTypeForm
                        nameProp={nameProp}
                        statusProp={statusProp}
                        id={id}
                        setOpen={setOpen}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Add Brewery Type</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add Brewery Type</DrawerTitle>
                </DrawerHeader>
                <BreweryTypeForm
                    className="px-4"
                    nameProp={nameProp}
                    statusProp={statusProp}
                    id={id}
                    setOpen={setOpen}
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

const BreweryTypeForm = ({
    nameProp,
    statusProp,
    className,
    id,
    setOpen
}: BreweryFormProps) => {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(
        statusProp
            ? statusLabels.find((g) => g.value === statusProp!)
            : undefined
    );
    const [name, setName] = useState(nameProp || undefined);

    const form = useForm({
        resolver: zodResolver(BreweryTypeSchema),
        defaultValues: {
            name: name || "",
            status: status?.value || "DRAFT"
        }
    });

    const onSubmit = (values: z.infer<typeof BreweryTypeSchema>) => {
        startTransition(() => {
            id
                ? updateBreweryType(values, id)
                      .then((data) => {
                          if (data?.error) {
                              setError(data.error);
                          }
                          if (data?.success) {
                              setOpen(false);
                              form.reset(values);
                              toast.success(data.success);
                          }
                      })
                      .catch(() => setError("Something went wrong!"))
                : addBreweryType(values)
                      .then((data) => {
                          if (data?.error) {
                              setError(data.error);
                          }
                          if (data?.success) {
                              setOpen(false);
                              form.reset(values);
                              toast.success(data.success);
                          }
                      })
                      .catch(() => setError("Something went wrong!"));
        });
    };

    return (
        <Form {...form}>
            <FormError message={error} />
            <form
                className={cn("grid items-start gap-4", className)}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className={cn("w-full")}>
                                <FormLabel>Type Name</FormLabel>
                                <FormControl>
                                    <AccountFormInput
                                        {...field}
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className={cn("w-full")}>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    disabled={isPending}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                "h-12 w-full rounded-xl px-6 py-3 text-sm font-normal"
                                            )}
                                        >
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Genders</SelectLabel>
                                            <SelectItem value={Status.DRAFT}>
                                                Draft
                                            </SelectItem>
                                            <SelectItem value={Status.PENDING}>
                                                Pending
                                            </SelectItem>
                                            <SelectItem value={Status.APPROVED}>
                                                Approved
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex-1">
                    <SubmitButton
                        text={name ? "Update" : "Add"}
                        isPending={isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default BreweryTypesDialog;
