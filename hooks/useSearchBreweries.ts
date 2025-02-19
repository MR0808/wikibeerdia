import { useQuery } from "@tanstack/react-query";

import { BreweriesResult } from "@/types/beers";

export const useSearchBreweries = (query: string) => {
    return useQuery<BreweriesResult[]>({
        queryKey: ["search", query],
        queryFn: async () => {
            if (!query) return [];
            const res = await fetch(
                `/api/brewery?query=${encodeURIComponent(query)}`
            );
            if (!res.ok) throw new Error("Failed to fetch data");
            return res.json();
        },
        enabled: !!query
    });
};
