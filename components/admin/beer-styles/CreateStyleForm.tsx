"use client";

import * as z from "zod";
import { type UseFormReturn } from "react-hook-form";

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
import { Slider } from "@/components/ui/range-slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { BeerStyleSchema } from "@/schemas/admin";
import { statusLabels } from "@/utils/types";

interface CreateStyleFormProps
    extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
    children: React.ReactNode;
    form: UseFormReturn<z.infer<typeof BeerStyleSchema>>;
    onSubmit: (data: z.infer<typeof BeerStyleSchema>) => void;
}

export const CreateStyleForm = ({
    form,
    onSubmit,
    children
}: CreateStyleFormProps) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Brewery type name"
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
              <FormLabel>Value Range</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={100}
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
                        const newValue = parseInt(e.target.value)
                        field.onChange([newValue, Math.max(newValue, field.value[1])])
                      }}
                      className="w-20"
                    />
                    <Input
                      type="number"
                      value={field.value[1]}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value)
                        field.onChange([Math.min(newValue, field.value[0]), newValue])
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
