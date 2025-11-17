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
   — Uses preprocess instead of pipe() to preserve ZodNumber
---------------------------------------------------------*/
export const coercedNumber = (schema: z.ZodNumber) =>
    z.preprocess((value) => {
        if (value === "" || value === null || value === undefined)
            return undefined;
        const n = Number(value);
        return isNaN(n) ? value : n;
    }, schema);

/* --------------------------------------------------------
   REQUIRED NUMBER / INT
---------------------------------------------------------*/
export const numberRequired = (msg: string) =>
    coercedNumber(z.number({ message: msg }));

export const intRequired = (msg: string) =>
    coercedNumber(z.number().int({ message: msg }));

/* --------------------------------------------------------
   BOOLEAN COERCION
---------------------------------------------------------*/
export const booleanRequired = (msg: string) =>
    z.preprocess(
        (value) => {
            if (value === "true" || value === true) return true;
            if (value === "false" || value === false) return false;
            return value;
        },
        z.boolean({ message: msg })
    );

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
---------------------------------------------------------*/
export const numberRange = (msg: string, validator: z.ZodType<number>) =>
    z
        .array(validator)
        .length(2, { message: msg })
        .transform((arr) => {
            const [min, max] = arr as [number, number];
            return { min, max };
        })
        .refine(({ min, max }) => min <= max, {
            message: msg
        });

/* ABV Range (0–30, step 0.1) */
export const abvRange = () =>
    numberRange(
        "Minimum ABV must be ≤ Maximum ABV",
        coercedNumber(z.number().min(0).max(30).multipleOf(0.1))
    );

/* IBU Range (0–100 int) */
export const ibuIntRange = () =>
    numberRange(
        "Minimum IBU must be ≤ Maximum IBU",
        coercedNumber(z.number().int().min(0).max(100))
    );

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
