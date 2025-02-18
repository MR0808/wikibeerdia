import { Beer, Star, Hop, CalendarDays } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const BeersListSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 12 }).map((_, index) => {
                return (
                    <div
                        key={index}
                        className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5 md:h-72 md:flex-row"
                    >
                        <Skeleton className="w-full md:mr-12 md:w-1/3" />
                        <div className="flex w-full flex-col space-y-4 pt-5 md:w-2/3">
                            <div className="visible block size-8 md:collapse md:hidden">
                                <Skeleton className="size-8 rounded-full" />
                            </div>
                            <div className="flex flex-row justify-between md:pr-10">
                                <Skeleton className="h-10 w-60" />
                                <div className="collapse hidden md:visible md:block">
                                    <Skeleton className="size-8 rounded-full" />
                                </div>
                            </div>
                            <div className="text-foreground/55 text-lg md:text-xl">
                                <Skeleton className="h-7 w-40" />
                            </div>
                            <div className="text-foreground/60 mt-5 w-full border-y border-dashed border-t-gray-300 py-7 text-lg md:pr-10 md:text-xl">
                                <ul className="flex w-full list-none flex-row items-center justify-between space-x-0 md:flex-wrap md:space-x-20">
                                    <li className="flex flex-col space-y-2">
                                        <div className="flex flex-row items-center">
                                            <Beer className="mr-2 size-5" />
                                            <Skeleton className="h-7 w-20" />
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <Hop className="mr-2 size-5" />
                                            <Skeleton className="h-7 w-20" />
                                        </div>
                                    </li>
                                    <li className="flex flex-col space-y-2">
                                        <div className="flex flex-row items-center">
                                            <CalendarDays className="mr-2 size-5" />
                                            <Skeleton className="h-7 w-20" />
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <Star className="mr-2 size-5" />
                                            <Skeleton className="h-7 w-20" />
                                        </div>
                                    </li>
                                    <li className="collapse hidden flex-row items-center md:visible md:flex">
                                        <Skeleton className="size-10 rounded-4xl" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default BeersListSkeleton;
