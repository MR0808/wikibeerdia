"use server";

import db from "@/lib/db";
import { renderError } from "@/lib/handleError";

export const incrementView = async (slug: string) => {
    try {
        const data = await db.blog.findFirst({
            where: { slug }
        });
        const count = 0;

        if (data) {
            await db.blog.update({
                where: { id: data.id },
                data: { count: data.count + 1 }
            });
        } else {
            await db.blog.create({ data: { slug, count: 1 } });
        }
        return { data, error: null };
    } catch (error) {
        const err = renderError(error);
        return { data: null, error: err.message };
    }
};

export const getViews = async (slug: string) => {
    try {
        const data = await db.blog.findFirst({
            where: { slug }
        });
        if (!data) {
            return { data: null, error: "Blog doesn't exist in system" };
        }
        return { data: data.count, error: null };
    } catch (error) {
        const err = renderError(error);
        return { data: null, error: err.message };
    }
};
