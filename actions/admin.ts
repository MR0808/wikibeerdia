"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BreweryTypeSchema } from "@/schemas/admin";

export const addBreweryType = async (
    values: z.infer<typeof BreweryTypeSchema>
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

    await db.breweryType.create({
        data: {
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
