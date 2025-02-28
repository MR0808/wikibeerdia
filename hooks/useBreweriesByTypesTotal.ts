import { getBreweriesByTypesTotal } from "@/actions/breweries";
import { useQuery } from "@tanstack/react-query";

export const useBreweriesByTypesTotal = (slug: string) => {
    return useQuery<number>({
        queryKey: ["typesTotal", slug],
        queryFn: () => getBreweriesByTypesTotal(slug),
        enabled: !!slug
    });
};
