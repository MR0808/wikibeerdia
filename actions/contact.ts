"use server";

import * as z from "zod";
import { Contact } from "@prisma/client";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { ContactSchema } from "@/schemas/contact";
import { getErrorMessage, renderError } from "@/lib/handleError";
import { sendContactEmail } from "@/lib/mail";

export const createContact = async (values: z.infer<typeof ContactSchema>) => {
    let data: Contact;
    try {
        const user = await checkAuth();

        const validatedFields = ContactSchema.safeParse(values);

        if (!validatedFields.success) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        const { name, email, message } = validatedFields.data;

        data = await db.contact.create({
            data: {
                name,
                email,
                message,
                ...(user && { userId: user.id })
            }
        });
        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }
        await sendContactEmail({ name, email, message });

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error.message : "An error occurred"
        };
    }
};
