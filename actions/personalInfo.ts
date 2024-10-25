"use server";

import * as z from "zod";

import db from "@/lib/db";
import {
    NameSchema,
    GenderSchema,
    LocationSchema,
    DateOfBirthSchema,
    DisplayNameSchema,
    ProfilePictureSchema
} from "@/schemas/personal-info";
import { validateWithZodSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { unstable_update as update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { checkAuth } from "@/lib/auth";
import { State } from "@prisma/client";
import { uploadImage, deleteImage } from "@/utils/supabase";
import { renderError } from "@/lib/handleError";

export const updateDisplayName = async (
    values: z.infer<typeof DisplayNameSchema>
) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const validatedFields = DisplayNameSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    });

    update({
        user: {
            displayName: updatedUser.displayName as string
        }
    });

    return { success: "Display name updated" };
};

export const updateName = async (values: z.infer<typeof NameSchema>) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };
    const validatedFields = NameSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    });

    update({
        user: {
            firstName: updatedUser.firstName as string,
            lastName: updatedUser.lastName as string
        }
    });

    return { success: "Name updated" };
};

export const updateGender = async (values: z.infer<typeof GenderSchema>) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const validatedFields = GenderSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    });

    return { success: "Gender updated" };
};

export const updateLocation = async (
    values: z.infer<typeof LocationSchema>
) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const validatedFields = LocationSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    let state: State | undefined;
    let stateDb: string | null | undefined;

    if (values.state === "") {
        state = undefined;
        stateDb = null;
    } else {
        const tempState = await db.state.findFirst({
            where: { id: values.state }
        });
        state = tempState ? tempState : undefined;
        stateDb = values.state;
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            countryId: values.country,
            stateId: stateDb
        }
    });

    const country = await db.country.findFirst({
        where: { id: values.country }
    });

    return { success: "Location updated", country, state };
};

export const updateDateOfBirth = async (
    values: z.infer<typeof DateOfBirthSchema>
) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const validatedFields = DateOfBirthSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    });

    return { success: "Date of birth updated" };
};

export const updateProfilePicture = async (formData: FormData) => {
    try {
        const user = await checkAuth();

        if (!user)
            return {
                result: false,
                message: "Unauthorized"
            };

        const image = formData.get("image") as File;

        const validatedFile = validateWithZodSchema(ProfilePictureSchema, {
            image
        });

        const fullPath = await uploadImage(
            validatedFile.image,
            "profile-bucket"
        );
        if (user?.image) await deleteImage(user?.image, "profile-bucket");
        await db.user.update({
            where: { id: user.id },
            data: {
                image: fullPath
            }
        });

        update({
            user: {
                image: fullPath as string
            }
        });

        return { result: true, message: "Profile image updated successfully" };
    } catch (error) {
        return renderError(error);
    }
};
