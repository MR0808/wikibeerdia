"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { SubStyle, type SubStyle as SubStyleType } from "@prisma/client";
import { format } from "date-fns";

import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BeerStyleSchema } from "@/schemas/admin";
import { GetSearchSchema } from "@/utils/types";
import { filterColumn } from "@/lib/filterColumn";
import { getErrorMessage } from "@/lib/handleError";

export const getBeerSubStyles = async (
    input: GetSearchSchema,
    styleId: string
) => {
    noStore();
    let {
        page,
        per_page,
        sort,
        name,
        status,
        description,
        parentStyle,
        operator,
        from,
        to
    } = input;

    try {
        const offset = (page - 1) * per_page;
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "name",
            "asc"
        ]) as [
            keyof SubStyle | "parentStyle" | undefined,
            "asc" | "desc" | undefined
        ];

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

        parentStyle &&
            whereFilter.push(
                filterColumn({
                    column: "parentStyleId",
                    value: parentStyle,
                    isSelectable: true
                })
            );

        // description &&
        //     whereFilter.push(
        //         filterColumn({
        //             column: "description",
        //             value: description
        //         })
        //     );

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
            ? (usedFilter = { AND: [{ styleId }, ...whereFilter] })
            : (usedFilter = { OR: [...whereFilter], AND: { styleId } });

        let orderBy = [{ [`${column}`]: `${order}` }];

        const data = await db.subStyle.findMany({
            where: usedFilter,
            skip: offset,
            take: per_page,
            orderBy
        });

        const total = await db.subStyle.count({ where: usedFilter });

        const pageCount = Math.ceil(total / per_page);
        return { data, pageCount };
    } catch (err) {
        return { data: [], pageCount: 0 };
    }
};

export const createBeerSubStyle = async (
    values: z.infer<typeof BeerStyleSchema>,
    styleId: string
) => {
    noStore();
    const user = await currentUser();

    if (!user) {
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };
    }

    if (!user.id) {
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };
    }

    if (user.role !== "ADMIN") {
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };
    }

    const validatedFields = BeerStyleSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            data: null,
            error: getErrorMessage("Invalid fields!")
        };
    }

    try {
        await db.subStyle.create({
            data: {
                userId: user.id,
                styleId: styleId,
                ...values
            }
        });

        revalidatePath(`/admin/beer-styles/${styleId}`);

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

export const updateBeerSubStyle = async (
    values: z.infer<typeof BeerStyleSchema>,
    id: string,
    styleId: string
) => {
    noStore();
    const user = await currentUser();

    if (!user) {
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };
    }

    if (!user.id) {
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };
    }

    if (user.role !== "ADMIN") {
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };
    }

    const validatedFields = BeerStyleSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            data: null,
            error: getErrorMessage("Invalid fields!")
        };
    }
    try {
        await db.subStyle.update({
            where: { id },
            data: {
                ...values
            }
        });

        revalidatePath(`/admin/beer-styles/${styleId}`);

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

export const updateBeerSubStyles = async (
    input: {
        ids: string[];
        status?: SubStyleType["status"];
    },
    styleId: string
) => {
    noStore();

    try {
        await db.subStyle.updateMany({
            where: { id: { in: input.ids } },
            data: { status: input.status }
        });

        revalidatePath(`/admin/beer-styles/${styleId}`);

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

        const totalTypes = await db.style.count();

        const totalChunks = Math.ceil(totalTypes / chunkSize);

        let chunkedTasks;

        for (let i = 0; i < totalChunks; i++) {
            const chunked = await db.subStyle.findMany({
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
