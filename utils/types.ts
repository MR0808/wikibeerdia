import { ExtendedUser } from '@/next-auth';
import { Gender } from '@prisma/client';

export type NavLink = {
    href: string;
    label: string;
    subMenu?: NavLink[];
};

export type actionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ message: string }>;

export interface UserProps {
    user?: ExtendedUser;
}

export interface GenderProps {
    genderProp?: Gender;
}
