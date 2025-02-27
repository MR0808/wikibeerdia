import { getBeersByStylesTotal } from "@/actions/beers";
import { useQuery } from "@tanstack/react-query";

export const useBeerByStylesTotal = (slug: string, parentSlug: string) => {
    return useQuery<number>({
        queryKey: ["stylesTotal", slug, parentSlug],
        queryFn: () => getBeersByStylesTotal(slug, parentSlug),
        enabled: !!slug || !!parentSlug
    });
};
