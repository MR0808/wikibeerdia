import { Skeleton } from "@/components/ui/skeleton";

const BeerSkeleton = () => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="w-1/2 space-y-4">
                    <Skeleton className="h-16 w-40 md:w-full" />
                    <Skeleton className="h-16 w-40 md:w-full" />
                    <Skeleton className="h-6 w-32 md:w-full" />
                    <Skeleton className="h-6 w-32 md:w-full" />
                    <div className="mt-20 hidden flex-wrap text-wrap md:mt-10 md:flex">
                        <div className="mt-15 flex flex-row opacity-70">
                            <Skeleton className="h-6 w-96" />
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 flex-row justify-end md:text-center">
                    <div className="inline-block">
                        <Skeleton className="h-32 w-32 md:h-48 md:w-48" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="w-1/2">
                    <ul className="mt-9 hidden list-none space-x-3 md:flex">
                        <li>
                            <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                        </li>
                        <li>
                            <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                        </li>
                        <li>
                            <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                        </li>
                    </ul>
                </div>
                <div className="flex w-1/2 flex-row justify-end md:text-center">
                    <ul className="mt-9 hidden list-none space-x-3 md:flex">
                        <li>
                            <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                        </li>
                        <li>
                            <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                        </li>
                        <li>
                            <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap md:hidden">
                <div className="mt-8">
                    <div className="mt-4 flex opacity-70">
                        <Skeleton className="h-6 w-48" />
                    </div>
                </div>
                <ul className="mt-9 flex list-none space-x-2 md:space-x-3">
                    <li>
                        <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />{" "}
                    </li>
                    <li>
                        <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                    </li>
                    <li>
                        <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                    </li>
                    <li>
                        <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                    </li>
                    <li>
                        <Skeleton className="flex h-12 w-12 items-center justify-center rounded-full" />
                    </li>
                </ul>
            </div>
            <div className="mt-12 flex flex-col md:mt-24 md:flex-row md:space-x-3">
                <Skeleton className="h-56 w-full rounded-lg p-5 shadow-lg md:h-[664px] md:w-5/6 md:p-8" />
                <Skeleton className="mt-5 h-32 w-full rounded-lg p-5 shadow-lg md:mt-0 md:h-[664px] md:w-1/6 md:p-8" />
            </div>
        </>
    );
};
export default BeerSkeleton;
