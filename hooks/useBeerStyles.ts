import { useQuery } from "@tanstack/react-query";

import { Styles } from "@/types/beers";

const fetchStyles = async (parentSlug: string) => {
    const queryParams = new URLSearchParams();
    if (parentSlug) queryParams.append("parentSlug", parentSlug);

    const res = await fetch(`/api/styles?${queryParams.toString()}`);
    if (!res.ok) {
        throw new Error("Failed to fetch styles");
    }
    return res.json();
};

export const useBeerStyles = (parentSlug: string) => {
    return useQuery<Styles[]>({
        queryKey: ["styles", parentSlug],
        queryFn: () => fetchStyles(parentSlug),
        enabled: !!parentSlug
    });
};
