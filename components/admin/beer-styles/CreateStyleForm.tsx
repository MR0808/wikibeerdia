"use client";

import * as z from "zod";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/range-slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BeerStyleSchema } from "@/schemas/admin";
import { statusLabels } from "@/utils/types";
import { ParentStyle } from "@/types/beerStyles";

interface CreateStyleFormProps
    extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
    children: React.ReactNode;
    form: UseFormReturn<z.infer<typeof BeerStyleSchema>>;
    onSubmit: (data: z.infer<typeof BeerStyleSchema>) => void;
    parentStyles: ParentStyle[];
}

export const CreateStyleForm = ({
    form,
    onSubmit,
    children,
    parentStyles
}: CreateStyleFormProps) => {
    const { fields, append, remove } = useFieldArray({
        name: "region",
        control: form.control
    });
    return (
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Beer style name"
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
                                            value={field.value[0].toFixed(1)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(
                                                    parseFloat(
                                                        e.target.value
                                                    ).toFixed(1)
                                                );
                                                field.onChange([
                                                    newValue,
                                                    Math.max(
                                                        newValue,
                                                        field.value[1]
                                                    )
                                                ]);
                                            }}
                                            step={0.1}
                                            className="w-24"
                                        />
                                        <Input
                                            type="number"
                                            value={field.value[1].toFixed(1)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(
                                                    parseFloat(
                                                        e.target.value
                                                    ).toFixed(1)
                                                );
                                                field.onChange([
                                                    Math.min(
                                                        newValue,
                                                        field.value[0]
                                                    ),
                                                    newValue
                                                ]);
                                            }}
                                            step={0.1}
                                            className="w-24"
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
                                                const newValue = parseInt(
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
                                                const newValue = parseInt(
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
                                    className={index !== 0 ? "sr-only" : ""}
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
                                                onClick={() => remove(index)}
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
                {children}
            </form>
        </Form>
    );
};
