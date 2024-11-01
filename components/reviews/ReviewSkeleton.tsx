import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ReviewSkeleton = () => {
    return (
        <Card className="relative p-2 md:p-6">
            <div className="flex h-52 flex-col content-start items-start space-y-5 p-2 md:h-20 md:flex-row md:space-y-0">
                <div className="flex flex-row space-x-1 md:w-1/3">
                    <Skeleton className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
                <div className="space-y-2 md:w-2/3">
                    <Skeleton className="h-4 w-[250px] md:w-[400px]" />
                    <Skeleton className="h-4 w-[250px] md:w-[400px]" />
                    <Skeleton className="h-4 w-[250px] md:w-[400px]" />
                </div>
            </div>
        </Card>
    );
};

export default ReviewSkeleton;
