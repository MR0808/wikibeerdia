"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { BreweryType, type BreweryType as TypeType } from "@prisma/client";
import { format } from "date-fns";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

import db from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { BreweryTypeSchema } from "@/schemas/admin";
import { GetTypesSchema } from "@/types/admin";
import { filterColumn } from "@/lib/filterColumn";
import { getErrorMessage } from "@/lib/handleError";

export const getBreweryTypesForms = async () => {
    const data = await db.breweryType.findMany({
        where: {
            status: "APPROVED"
        },
        select: {
            id: true,
            name: true
        },
        orderBy: { name: "asc" }
    });
    return { data };
};

export const getBreweryTypes = async (input: GetTypesSchema) => {
    const { page, per_page, sort, name, status, operator, from, to } = input;

    try {
        const offset = (page - 1) * per_page;
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "name",
            "asc"
        ]) as [keyof BreweryType | undefined, "asc" | "desc" | undefined];

        const fromDay = from ? format(new Date(from), "yyyy-MM-dd") : undefined;
        const toDay = to ? format(new Date(to), "yyyy-MM-dd") : undefined;

        let whereFilter = [];

        name &&
            whereFilter.push(
                filterColumn({
                    column: "name",
                    value: name
                })
            );

        status &&
            whereFilter.push(
                filterColumn({
                    column: "status",
                    value: status,
                    isSelectable: true
                })
            );

        fromDay && whereFilter.push({ createdAt: { gte: fromDay } });

        toDay && whereFilter.push({ createdAt: { lte: toDay } });

        let usedFilter;

        !operator || operator === "and"
            ? (usedFilter = { AND: [...whereFilter] })
            : (usedFilter = { OR: [...whereFilter] });

        const orderBy = [{ [`${column}`]: `${order}` }];

        const data = await db.breweryType.findMany({
            where: usedFilter,
            skip: offset,
            take: per_page,
            orderBy
        });

        const total = await db.breweryType.count({ where: usedFilter });

        const pageCount = Math.ceil(total / per_page);
        console.log("pagecount", pageCount);
        return { data, pageCount };
    } catch (err) {
        return { data: [], pageCount: 0 };
    }
};

export const createBreweryType = async (
    values: z.infer<typeof BreweryTypeSchema>
) => {
    const user = await checkAuth(true);

    if (!user)
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };

    const validatedFields = BreweryTypeSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            data: null,
            error: getErrorMessage("Invalid fields!")
        };
    }

    try {
        let slug = slugger.slug(values.name);
        let slugExists = true;

        while (slugExists) {
            const checkSlug = await db.breweryType.findFirst({
                where: { slug }
            });
            if (!checkSlug) {
                slugExists = false;
                break;
            } else {
                slug = slugger.slug(values.name);
            }
        }

        await db.breweryType.create({
            data: {
                userId: user.id,
                colour: "#ffffff",
                slug,
                ...values
            }
        });

        revalidatePath("/admin/brewery-types");

        return {
            data: null,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err)
        };
    }
};

export const updateBreweryType = async (
    values: z.infer<typeof BreweryTypeSchema>,
    id: string
) => {
    const user = await checkAuth(true);

    if (!user)
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };

    const validatedFields = BreweryTypeSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            data: null,
            error: getErrorMessage("Invalid fields!")
        };
    }
    try {
        await db.breweryType.update({
            where: { id },
            data: {
                ...values
            }
        });

        revalidatePath("/admin/brewery-types");

        return {
            data: null,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err)
        };
    }
};

export const updateBreweryTypes = async (input: {
    ids: string[];
    status?: TypeType["status"];
}) => {
    const user = await checkAuth(true);

    if (!user)
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };

    try {
        await db.breweryType.updateMany({
            where: { id: { in: input.ids } },
            data: { status: input.status }
        });

        revalidatePath("/admin/brewery-types");

        return {
            data: null,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err)
        };
    }
};

export const getChunkedTypes = async (input: { chunkSize?: number } = {}) => {
    try {
        const chunkSize = input.chunkSize ?? 1000;

        const totalTypes = await db.breweryType.count();

        const totalChunks = Math.ceil(totalTypes / chunkSize);

        let chunkedTasks;

        for (let i = 0; i < totalChunks; i++) {
            const chunked = await db.breweryType.findMany({
                take: chunkSize,
                skip: i
            });

            chunkedTasks = chunked.map((type) => {
                return {
                    ...type,
                    createdAt: type.createdAt.toString(),
                    updatedAt: type.updatedAt?.toString()
                };
            });
        }

        return {
            data: chunkedTasks,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err)
        };
    }
};
