import { Skeleton } from "@/components/ui/skeleton";

const SearchGridSkeleton = ({ grids = 2 }: { grids?: number }) => {
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
                                <li className="flex w-full flex-row items-center">
                                    <Skeleton className="mr-2 size-5" />
                                    <Skeleton className="h-5 w-1/2" />
                                </li>
                                <li className="flex w-full flex-row items-center justify-end">
                                    <Skeleton className="mr-2 size-5" />
                                    <Skeleton className="h-5 w-1/2" />
                                </li>
                                <li className="flex w-full flex-row items-center justify-end">
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
export default SearchGridSkeleton;
