import { UserRole } from '@/generated/prisma/client';
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    role: UserRole;
    otpEnabled: boolean;
    isOAuth: boolean;
    image: string | undefined;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
