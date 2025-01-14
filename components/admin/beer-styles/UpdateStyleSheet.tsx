"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { PlusCircle, X } from "lucide-react";

import { BeerStyle } from "@/types/beerStyles";
import { Button } from "@/components/ui/button";
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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/global/Icons";
import { Slider } from "@/components/ui/range-slider";
import { Input } from "@/components/ui/input";
import { updateBreweryType } from "@/actions/breweryTypes";
import { ParentStyle } from "@/types/beerStyles";
import { BeerStyleSchema } from "@/schemas/admin";
import { statusLabels } from "@/utils/types";
import { updateBeerStyle } from "@/actions/beerStyles";

interface UpdateStyleSheetProps
    extends React.ComponentPropsWithRef<typeof Sheet> {
    style: BeerStyle;
    parentStyles: ParentStyle[];
}

export const UpdateStyleSheet = ({
    style,
    parentStyles,
    ...props
}: UpdateStyleSheetProps) => {
    const [isUpdatePending, startUpdateTransition] = useTransition();

    console.log(style.parentStyleId, parentStyles);

    const abvLow = parseInt(style.abvLow || "0");
    const abvHigh = parseInt(style.abvHigh || "0");
    const ibuLow = parseInt(style.ibuLow || "30");
    const ibuHigh = parseInt(style.ibuHigh || "60");
    const region = style.region.map((item) => {
        return { value: item };
    });

    const form = useForm<z.infer<typeof BeerStyleSchema>>({
        resolver: zodResolver(BeerStyleSchema),
        defaultValues: {
            parentStyle: style.parentStyleId,
            status: style.status,
            name: style.name,
            description: style.description || undefined,
            region,
            abv: [abvLow, abvHigh],
            ibu: [ibuLow, ibuHigh]
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "region",
        control: form.control
    });

    useEffect(() => {
        form.reset({
            parentStyle: style.parentStyleId,
            status: style.status,
            name: style.name,
            description: style.description || undefined,
            region,
            abv: [abvLow, abvHigh],
            ibu: [ibuLow, ibuHigh]
        });
    }, [style, form]);

    function onSubmit(input: z.infer<typeof BeerStyleSchema>) {
        startUpdateTransition(async () => {
            const { error } = await updateBeerStyle(input, style.id);

            if (error) {
                toast.error(error);
                return;
            }

            form.reset();
            props.onOpenChange?.(false);
            toast.success("Task updated");
        });
    }

    return (
        <Sheet {...props}>
            <SheetContent className="flex max-h-screen flex-col gap-6 overflow-y-scroll sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Update task</SheetTitle>
                    <SheetDescription>
                        Update the type details and save the changes
                    </SheetDescription>
                </SheetHeader>
                {/* <div className="flex-1 overflow-y-auto">
                    <div className="space-y-8 p-6"> */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="parentStyle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parent Style</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="capitalize">
                                                <SelectValue placeholder="Select a parent style" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {parentStyles.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                        className="capitalize"
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Do a kickflip"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Beer style description"
                                            className="h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="abv"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ABV Range</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4 pt-3">
                                            <Slider
                                                min={0}
                                                max={30}
                                                step={0.1}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between">
                                                <Input
                                                    type="number"
                                                    value={field.value[0]}
                                                    onChange={(e) => {
                                                        const newValue =
                                                            parseInt(
                                                                e.target.value
                                                            );
                                                        field.onChange([
                                                            newValue,
                                                            Math.max(
                                                                newValue,
                                                                field.value[1]
                                                            )
                                                        ]);
                                                    }}
                                                    className="w-20"
                                                />
                                                <Input
                                                    type="number"
                                                    value={field.value[1]}
                                                    onChange={(e) => {
                                                        const newValue =
                                                            parseInt(
                                                                e.target.value
                                                            );
                                                        field.onChange([
                                                            Math.min(
                                                                newValue,
                                                                field.value[0]
                                                            ),
                                                            newValue
                                                        ]);
                                                    }}
                                                    className="w-20"
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ibu"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>IBU Range</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4 pt-3">
                                            <Slider
                                                min={0}
                                                max={120}
                                                step={1}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between">
                                                <Input
                                                    type="number"
                                                    value={field.value[0]}
                                                    onChange={(e) => {
                                                        const newValue =
                                                            parseInt(
                                                                e.target.value
                                                            );
                                                        field.onChange([
                                                            newValue,
                                                            Math.max(
                                                                newValue,
                                                                field.value[1]
                                                            )
                                                        ]);
                                                    }}
                                                    className="w-20"
                                                />
                                                <Input
                                                    type="number"
                                                    value={field.value[1]}
                                                    onChange={(e) => {
                                                        const newValue =
                                                            parseInt(
                                                                e.target.value
                                                            );
                                                        field.onChange([
                                                            Math.min(
                                                                newValue,
                                                                field.value[0]
                                                            ),
                                                            newValue
                                                        ]);
                                                    }}
                                                    className="w-20"
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`region.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                index !== 0 ? "sr-only" : ""
                                            }
                                        >
                                            {index === 0 ? "Regions" : ""}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-2 pt-2">
                                                <Input {...field} />
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ value: "" })}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Item
                        </Button>
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="capitalize">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {statusLabels.map((item) => (
                                                    <SelectItem
                                                        key={item.value}
                                                        value={item.value}
                                                        className="capitalize"
                                                    >
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                            <SheetClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </SheetClose>
                            <Button disabled={isUpdatePending}>
                                {isUpdatePending && (
                                    <Icons.spinner
                                        className="mr-2 size-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                Save
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
                {/* </div>
                </div> */}
            </SheetContent>
        </Sheet>
    );
};
