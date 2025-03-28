import { Beer, Star, Hop, CalendarDays } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const BeersGridSkeleton = ({ grids = 2 }: { grids?: number }) => {
    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-${grids}`}>
            {Array.from({ length: 12 }).map((_, index) => {
                return (
                    <div
                        key={index}
                        className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5"
                    >
                        <Skeleton className="h-80 overflow-hidden rounded-xl" />
                        <div className="flex flex-col space-y-4">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-5 w-1/4" />
                        </div>
                        <div className="text-foreground/60 w-full border-t border-dashed border-t-gray-300 pt-4 text-xl">
                            <ul className="flex w-full list-none flex-row items-center justify-between">
                                <li className="flex flex-col space-y-2">
                                    <div className="flex flex-row items-center">
                                        <Beer className="mr-2 size-5" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <Hop className="mr-2 size-5" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                </li>
                                <li className="flex flex-col space-y-2">
                                    <div className="flex flex-row items-center">
                                        <CalendarDays className="mr-2 size-5" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <Star className="mr-2 size-5" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                </li>
                                <li className="flex flex-row items-center justify-end">
                                    <Skeleton className="size-10 rounded-4xl" />
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default BeersGridSkeleton;
