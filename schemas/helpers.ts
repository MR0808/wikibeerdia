import * as z from "zod";

/* --------------------------------------------------------
   PRISMA ENUM → ZOD ENUM (Zod 4 replacement for nativeEnum)
---------------------------------------------------------*/
export const zEnumFromPrisma = <T extends Record<string, string>>(
    prismaEnum: T
) => z.enum(Object.values(prismaEnum) as [T[keyof T], ...T[keyof T][]]);

/* --------------------------------------------------------
   STRING HELPERS
---------------------------------------------------------*/
export const stringRequired = (msg: string) => z.string().min(1, msg);

/* --------------------------------------------------------
   NUMBER COERCION (Zod 4 safe)
   — Uses coerce which properly infers number output type
---------------------------------------------------------*/
export const coercedNumber = (schema: z.ZodNumber) =>
    z.coerce.number().pipe(schema);

/* --------------------------------------------------------
   REQUIRED NUMBER / INT
   — Using z.number() directly since forms handle conversion
   — For API/form data that needs coercion, use z.coerce.number() directly
---------------------------------------------------------*/
export const numberRequired = (msg: string) =>
    z.number({ message: msg });

export const intRequired = (msg: string) =>
    z.number().int({ message: msg });

/* --------------------------------------------------------
   BOOLEAN
   — Using z.boolean() directly since forms handle conversion
---------------------------------------------------------*/
export const booleanRequired = (msg: string) =>
    z.boolean({ message: msg });

/* --------------------------------------------------------
   FILE VALIDATORS (Zod 4)
---------------------------------------------------------*/
export const fileValue = () =>
    z.custom<File>((value) => value instanceof File, {
        message: "Invalid file"
    });

export const fileListBrowserOnly = () =>
    typeof window === "undefined" ? z.any() : z.instanceof(FileList);

/* Array of { value: File } */
export const fileObjectArray = () => z.array(z.object({ value: fileValue() }));

/* --------------------------------------------------------
   RANGE HELPERS (Zod 4 safe)
   Output: { min: number, max: number }
   Input: [number, number] (for form compatibility)
---------------------------------------------------------*/
export const numberRange = (msg: string, validator: z.ZodType<number>) => {
    const tupleSchema = z.tuple([validator, validator]);
    return tupleSchema
        .refine(([min, max]) => min <= max, {
            message: msg
        })
        .transform(([min, max]) => ({ min, max }));
};

/* ABV Range (0–30, step 0.1) - returns array for form compatibility */
export const abvRange = () =>
    z
        .tuple([z.number().min(0).max(30).multipleOf(0.1), z.number().min(0).max(30).multipleOf(0.1)])
        .refine(([min, max]) => min <= max, {
            message: "Minimum ABV must be ≤ Maximum ABV"
        });

/* IBU Range (0–100 int) - returns array for form compatibility */
export const ibuIntRange = () =>
    z
        .tuple([z.number().int().min(0).max(100), z.number().int().min(0).max(100)])
        .refine(([min, max]) => min <= max, {
            message: "Minimum IBU must be ≤ Maximum IBU"
        });

/* --------------------------------------------------------
   URL HELPERS
---------------------------------------------------------*/
export const urlOrEmpty = () => z.union([z.literal(""), z.string().url()]);

/* --------------------------------------------------------
   PAGINATION HELPERS
---------------------------------------------------------*/
export const paginationParams = z.object({
    page: coercedNumber(z.number()).default(1),
    per_page: coercedNumber(z.number()).default(10),
    sort: z.string().optional()
});

/* --------------------------------------------------------
   SEARCH PARAM BUILDER (extend pagination)
---------------------------------------------------------*/
export const buildSearchParams = (extras: Record<string, any>) =>
    paginationParams.extend(extras);
