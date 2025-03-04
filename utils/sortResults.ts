import { Results } from "@/types/search";

export const sortResults = (results: Results[], sort: string): Results[] => {
    return results.sort((a, b) => {
        switch (sort) {
            case "az":
                return a.name.localeCompare(b.name); // Name ascending
            case "za":
                return b.name.localeCompare(a.name); // Name descending
            case "newest":
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                ); // Created At Date ascending
            case "oldest":
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                ); // Created At Date descending
            case "popular":
                return (
                    parseFloat(b.averageRating) - parseFloat(a.averageRating)
                ); // Average Rating descending
            default:
                return a.name.localeCompare(b.name);
        }
    });
};
