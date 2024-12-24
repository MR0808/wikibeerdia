import { Skeleton } from "@/components/ui/skeleton";

const BeerSkeleton = () => {
    return (
        <>
            <div className="flex flex-col justify-between md:flex-row md:space-x-10">
                <div className="order-last mt-5 h-full w-full rounded-lg shadow-lg md:order-first md:mt-0">
                    <Skeleton className="h-full w-full" />
                </div>
                <div className="order-first flex h-min w-full flex-col justify-between space-y-5 md:order-last md:w-1/3 md:space-y-10">
                    <Skeleton className="h-96 w-full rounded-lg p-5 shadow-lg md:p-10" />
                    <Skeleton className="h-80 w-full rounded-lg p-5 shadow-lg md:p-10" />
                </div>
            </div>
        </>
    );
};
export default BeerSkeleton;
