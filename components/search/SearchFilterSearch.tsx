"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchFilterSearchProps } from "@/types/search";
import { SiteSearchSchema } from "@/schemas/search";
import { cn } from "@/lib/utils";

const SearchFilterSearch = ({ query, setQuery }: SearchFilterSearchProps) => {
    const formSearch = useForm<z.infer<typeof SiteSearchSchema>>({
        resolver: zodResolver(SiteSearchSchema),
        defaultValues: {
            query: query || ""
        }
    });

    const onSubmitQuery = (values: z.infer<typeof SiteSearchSchema>) => {
        setQuery(values.query);
    };

    useEffect(() => {
        formSearch.setValue("query", query);
    }, [query]);

    return (
        <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
            <div className="mb-4 text-xl font-bold text-black/80">Keywords</div>
            <Form {...formSearch}>
                <form
                    className="flex w-full flex-row items-center justify-between space-x-4 border border-gray-300 p-3"
                    onSubmit={formSearch.handleSubmit(onSubmitQuery)}
                >
                    <FormField
                        control={formSearch.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem className={cn("space-y-0")}>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Search..."
                                        className={cn(
                                            "h-9 w-full rounded-none border-0 text-lg text-black shadow-none focus-visible:ring-0"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        className={cn("size-10 cursor-pointer p-0")}
                    >
                        <Search />
                    </Button>
                </form>
            </Form>
        </div>
    );
};
export default SearchFilterSearch;
