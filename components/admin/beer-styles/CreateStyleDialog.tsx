"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";

import { BeerStyleSchema } from "@/schemas/admin";
import { CreateStyleForm } from "./CreateStyleForm";
import { createBeerStyle } from "@/actions/beerStyles";
import { ParentStyle } from "@/types/beerStyles";

export const CreateStyleDialog = ({
    parentStyles
}: {
    parentStyles: ParentStyle[];
}) => {
    const [open, setOpen] = useState(false);
    const [isCreatePending, startCreateTransition] = useTransition();
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const form = useForm<z.infer<typeof BeerStyleSchema>>({
        resolver: zodResolver(BeerStyleSchema),
        defaultValues: {
            parentStyle: "",
            status: "APPROVED",
            name: "",
            description: "",
            region: [{ value: "" }],
            abv: [0.0, 30.0],
            ibu: [10, 60]
        }
    });

    function onSubmit(input: z.infer<typeof BeerStyleSchema>) {
        startCreateTransition(async () => {
            const { error } = await createBeerStyle(input);

            if (error) {
                toast.error(error);
                return;
            }

            form.reset();
            setOpen(false);
            toast.success("Style created");
        });
    }

    if (isDesktop)
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                        New style
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Brewery Type</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new brewery
                            type.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateStyleForm
                        form={form}
                        onSubmit={onSubmit}
                        parentStyles={parentStyles}
                    >
                        <DialogFooter className="gap-2 pt-2 sm:space-x-0">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={isCreatePending}>
                                {isCreatePending && (
                                    <ReloadIcon
                                        className="mr-2 size-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                Create
                            </Button>
                        </DialogFooter>
                    </CreateStyleForm>
                </DialogContent>
            </Dialog>
        );

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    New style
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create Style</DrawerTitle>
                    <DrawerDescription>
                        Fill in the details below to create a new style.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="gap-2 sm:space-x-0">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button disabled={isCreatePending}>
                        {isCreatePending && (
                            <ReloadIcon
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Create
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
