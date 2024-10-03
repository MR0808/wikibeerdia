"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { BreweryType } from "@prisma/client";
import { format } from "date-fns";

import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BreweryTypeSchema } from "@/schemas/admin";
import { GetTypesSchema } from "@/utils/types";
import { filterColumn } from "@/lib/filterColumn";

export const getBreweryTypes = async (input: GetTypesSchema) => {
    noStore();
    const { page, per_page, sort, name, status, operator, from, to } = input;

    try {
        // Offset to paginate the results
        const offset = (page - 1) * per_page;
        // Column and order to sort by
        // Spliting the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "createdAt",
            "desc"
        ]) as [keyof BreweryType | undefined, "asc" | "desc" | undefined];

        // Convert the date strings to date objects
        const fromDay = from ? format(new Date(from), "yyyy-MM-dd") : undefined;
        const toDay = to ? format(new Date(to), "yyyy-DD-dd") : undefined;

        let whereFilter = [];

        // if (name) {
        //     const nameFilter = filterColumn({
        //         column: "name",
        //         value: name
        //     });
        //     nameFilter && whereFilter.push(nameFilter);
        // }

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

        const total = data.length;

        const pageCount = Math.ceil(total / per_page);
        return { data, pageCount };
    } catch (err) {
        return { data: [], pageCount: 0 };
    }
};

export const addBreweryType = async (
    values: z.infer<typeof BreweryTypeSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    if (!user.id) {
        return { error: "Unauthorized" };
    }

    if (user.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    const validatedFields = BreweryTypeSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    await db.breweryType.create({
        data: {
            userId: user.id,
            ...values
        }
    });

    revalidatePath("/admin/brewery-types");

    return { success: "Brewery type created" };
};

export const updateBreweryType = async (
    values: z.infer<typeof BreweryTypeSchema>,
    id: string
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    if (user.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    const validatedFields = BreweryTypeSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    await db.breweryType.update({
        where: { id },
        data: {
            ...values
        }
    });

    revalidatePath("/admin/brewery-types");

    return { success: "Brewery type updated" };
};
