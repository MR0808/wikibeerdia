"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { Style, type Style as StyleType } from "@prisma/client";
import { format } from "date-fns";

import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BeerStyleSchema } from "@/schemas/admin";
import { GetSearchSchema } from "@/utils/types";
import { filterColumn } from "@/lib/filterColumn";
import { filterSubColumn } from "@/lib/filterSubColumn";
import { getErrorMessage } from "@/lib/handleError";

export const getBeerStyles = async (input: GetSearchSchema) => {
    noStore();
    let {
        page,
        per_page,
        sort,
        name,
        status,
        description,
        subStyles,
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
            keyof Style | "parentStyle" | undefined,
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

        subStyles &&
            whereFilter.push(
                filterSubColumn({
                    parentColumn: "subStyles",
                    column: "name",
                    value: subStyles
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
            ? (usedFilter = { AND: [...whereFilter] })
            : (usedFilter = { OR: [...whereFilter] });

        let orderBy = [{ [`${column}`]: `${order}` }];

        if (column === "parentStyle") {
            sort = undefined;
        }

        const data = await db.style.findMany({
            where: usedFilter,
            include: {
                subStyles: {
                    select: {
                        name: true,
                        id: true,
                        status: true
                    }
                },
                parentStyle: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            },
            skip: offset,
            take: per_page,
            orderBy: sort ? orderBy : { parentStyle: { name: "asc" } }
        });

        const total = await db.style.count({ where: usedFilter });

        const pageCount = Math.ceil(total / per_page);
        return { data, pageCount };
    } catch (err) {
        return { data: [], pageCount: 0 };
    }
};

export const getBeerStyle = async (id: string) => {
    noStore();
    const data = await db.style.findUnique({
        where: {
            id
        },
        include: {
            subStyles: {
                select: {
                    name: true,
                    id: true,
                    status: true
                }
            },
            parentStyle: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    });
    return { data };
};

export const getParentStyles = async () => {
    noStore();
    const data = await db.parentStyle.findMany({
        select: {
            id: true,
            name: true
        },
        where: {
            status: "APPROVED"
        }
    });
    return { data };
};

export const createBeerStyle = async (
    values: z.infer<typeof BeerStyleSchema>,
    parentStyleId: string
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
        await db.style.create({
            data: {
                userId: user.id,
                parentStyleId: parentStyleId,
                ...values
            }
        });

        revalidatePath("/admin/beer-styles");

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

export const updateBeerStyle = async (
    values: z.infer<typeof BeerStyleSchema>,
    id: string
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
        await db.style.update({
            where: { id },
            data: {
                ...values
            }
        });

        revalidatePath("/admin/beer-styles");

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

export const updateBeerStyles = async (input: {
    ids: string[];
    status?: StyleType["status"];
}) => {
    noStore();

    try {
        await db.style.updateMany({
            where: { id: { in: input.ids } },
            data: { status: input.status }
        });

        revalidatePath("/admin/beer-styles");

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
            const chunked = await db.style.findMany({
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
