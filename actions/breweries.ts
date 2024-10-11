"use server";

import * as z from "zod";
import { Brewery } from "@prisma/client";
import { zfd } from "zod-form-data";

import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BrewerySchema, BrewerySchemaFormData } from "@/schemas/brewery";
import { getUserById } from "@/data/user";

export const createBrewery = async (formData: FormData) => {
    console.log("values", formData);
    try {
        const user = await currentUser();

        if (!user) {
            return { result: false, message: "Unauthorized" };
        }

        const dbUser = await getUserById(user.id!);

        if (!dbUser) {
            return { result: false, message: "Unauthorized" };
        }

        const form = BrewerySchemaFormData.safeParse(formData);
        console.log(form);

        // const logo = formData.get("logoUrl") as File;

        // console.log("logo", logo);
    } catch (error) {
        return renderError(error);
    }
};

const renderError = (
    error: unknown
): { result: boolean | null; message: string } => {
    console.log(error);
    return {
        result: false,
        message: error instanceof Error ? error.message : "An error occurred"
    };
};
