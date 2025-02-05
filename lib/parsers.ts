import { z } from 'zod';
import { createParser } from 'nuqs';

const SortSchema = z.enum(['', 'az', 'za', 'newest', 'oldest', 'popular']);
const ViewSchema = z.enum(['', 'grid', 'list'])
type SortOption = z.infer<typeof SortSchema>;
type ViewOption = z.infer<typeof ViewSchema>;

export const zodSortParser = createParser({
    parse: (value: string | null): SortOption => {
        const result = SortSchema.safeParse(value ?? '');
        return result.success ? result.data : '';
    },
    serialize: (value: SortOption) => value,
});

export const zodViewParser = createParser({
    parse: (value: string | null): ViewOption => {
        const result = ViewSchema.safeParse(value ?? '');
        return result.success ? result.data : '';
    },
    serialize: (value: ViewOption) => value,
});