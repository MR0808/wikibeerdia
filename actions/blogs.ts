"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { renderError, getErrorMessage } from "@/lib/handleError";
import { checkAuth } from "@/lib/auth";

export const incrementView = async (slug: string) => {
    try {
        const data = await db.blogView.findFirst({
            where: { slug }
        });

        if (data) {
            await db.blogView.update({
                where: { id: data.id },
                data: { count: data.count + 1 }
            });
        } else {
            await db.blogView.create({ data: { slug, count: 1 } });
        }
        return { data, error: null };
    } catch (error) {
        const err = renderError(error);
        return { data: null, error: err.message };
    }
};

export const getViews = async (slug: string) => {
    try {
        const data = await db.blogView.findFirst({
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

export const getBlogVotes = async (slug: string) => {
    const aggregations = await db.blogVote.aggregate({
        where: { slug },
        _avg: {
            vote: true
        },
        _count: {
            vote: true
        }
    });

    if (aggregations._count.vote === 0) {
        const data = { average: 0, count: 0 };
        return { data, error: null };
    } else {
        const data = {
            average: aggregations._avg.vote,
            count: aggregations._count.vote
        };
        return { data, error: null };
    }
};

export const createBlogVote = async (slug: string, vote: number) => {
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const views = await db.blogView.findFirst({
            where: { slug }
        });
        if (views) {
            await db.blogView.update({
                where: { id: views.id },
                data: { count: views.count - 1 }
            });
        }

        const userVote = await db.blogVote.findFirst({
            where: { userId: user.id, slug }
        });

        if (userVote) {
            const data = await db.blogVote.update({
                where: { id: userVote.id },
                data: {
                    vote,
                    slug,
                    userId: user.id
                }
            });
            revalidatePath(`/blog/${slug}`);

            return {
                data,
                error: null
            };
        }

        const data = await db.blogVote.create({
            data: {
                vote,
                slug,
                userId: user.id
            }
        });

        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        revalidatePath(`/blog/${slug}`);

        return {
            data,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error)
        };
    }
};
