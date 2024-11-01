"use server";

import * as z from "zod";
import { Report, Status, ReportTypes } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { ReportSchema } from "@/schemas/reports";
import { getErrorMessage, renderError } from "@/lib/handleError";
import { ReportType } from "@/types/report";

export const createReport = async (values: z.infer<typeof ReportSchema>) => {
    let report: Report;
    try {
        const user = await checkAuth();

        const validatedFields = ReportSchema.safeParse(values);

        if (!validatedFields.success) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        const { type, comment, id } = validatedFields.data;

        let data: ReportType = { comment, type };

        switch (type) {
            case "BEER":
                data = { ...data, beerId: id };
                break;
            case "BREWERY":
                data = { ...data, breweryId: id };
                break;
            case "BREWERYREVIEW":
                data = { ...data, breweryReviewId: id };
                break;
            case "BEERREVIEW":
                data = { ...data, beerReviewId: id };
                break;
        }

        if (user) data = { ...data, userId: user.id };

        report = await db.report.create({
            data
        });

        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        return {
            data: report,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error)
        };
    }
};
