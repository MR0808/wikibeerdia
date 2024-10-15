import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
};

export const checkAuth = async (admin = false) => {
    const user = await currentUser();

    if (!user) {
        return false;
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return false;
    }

    if (admin && user.role !== "ADMIN") {
        return false;
    }

    return dbUser;
};

export const checkAuthenticated = async (admin = false) => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    if (admin && user.role !== "ADMIN") {
        return null;
    }

    return user;
};