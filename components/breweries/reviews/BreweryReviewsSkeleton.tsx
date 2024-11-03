import { Skeleton } from "@/components/ui/skeleton";
import ReviewSkeleton from "@/components/reviews/ReviewSkeleton";

const BreweryReviewsSkeleton = () => {
    return (
        <>
            <div className="mt-12 flex flex-row md:mt-16 md:space-x-3">
                <div className="mb-5 h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                    <div className="mb-10 flex flex-row justify-start space-x-10">
                        <div className="inline-block">
                            <Skeleton className="h-20 w-20 md:h-48 md:w-48" />
                        </div>
                        <div className="flex flex-col justify-between space-y-4 md:space-y-0">
                            <h3 className="space-y-4 text-balance text-2xl font-semibold md:w-[600px] md:text-6xl">
                                <Skeleton className="h-7 w-40 md:h-16 md:w-full" />
                                <Skeleton className="h-7 w-40 md:h-16 md:w-full" />
                            </h3>
                            <div className="flex flex-row justify-start">
                                <Skeleton className="h-10 w-40" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 flex flex-col justify-between md:flex-row">
                        <h4 className="mb-5 text-4xl">
                            <Skeleton className="h-10 w-36" />
                        </h4>
                        <div>
                            <Skeleton className="h-[60px] w-[208px]" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5 md:flex-row md:space-x-10 md:space-y-0">
                        <div className="flex flex-col md:w-1/3">
                            <Skeleton className="h-[138px] w-[288px] md:w-[341px]" />
                        </div>
                        <div className="flex flex-col space-y-6 md:w-2/3">
                            <ReviewSkeleton />
                            <ReviewSkeleton />
                            <ReviewSkeleton />
                            <ReviewSkeleton />
                            <ReviewSkeleton />
                            <div className="mx-auto mt-10 flex flex-row items-center justify-center">
                                <Skeleton className="h-10 w-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default BreweryReviewsSkeleton;
