import { useQuery } from "@tanstack/react-query";

import { MultiSelect } from "@/types/beers";

export const useBeerStylesRegions = (parentStyleSlug: string) => {
    return useQuery<MultiSelect[]>({
        queryKey: ["beerStylesRegions", parentStyleSlug],
        queryFn: async () => {
            if (!parentStyleSlug) return [];
            const res = await fetch(
                `/api/region?parentStyleSlug=${encodeURIComponent(parentStyleSlug)}`
            );
            if (!res.ok) throw new Error("Failed to fetch data");
            return res.json();
        },
        enabled: !!parentStyleSlug
    });
};
