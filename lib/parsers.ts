import { z } from "zod";
import { createParser } from "nuqs";

const SortSchema = z.enum(["", "az", "za", "newest", "oldest", "popular"]);
const ViewSchema = z.enum(["", "grid", "list"]);
const AvailableSchema = z.enum(["", "true", "false"]);
const TypeSchema = z.enum(["all", "beers", "breweries"]);
type SortOption = z.infer<typeof SortSchema>;
type ViewOption = z.infer<typeof ViewSchema>;
type AvailableOption = z.infer<typeof AvailableSchema>;
type TypeOption = z.infer<typeof TypeSchema>;

export const zodSortParser = createParser({
    parse: (value: string | null): SortOption => {
        const result = SortSchema.safeParse(value ?? "");
        return result.success ? result.data : "";
    },
    serialize: (value: SortOption) => value
});

export const zodViewParser = createParser({
    parse: (value: string | null): ViewOption => {
        const result = ViewSchema.safeParse(value ?? "");
        return result.success ? result.data : "";
    },
    serialize: (value: ViewOption) => value
});

export const zodAvailableParser = createParser({
    parse: (value: string | null): AvailableOption => {
        const result = AvailableSchema.safeParse(value ?? "");
        return result.success ? result.data : "";
    },
    serialize: (value: AvailableOption) => value
});

export const zodTypeParser = createParser({
    parse: (value: string | null): TypeOption => {
        const result = TypeSchema.safeParse(value ?? "all");
        return result.success ? result.data : "all";
    },
    serialize: (value: TypeOption) => value
});
