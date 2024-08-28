import { ExtendedUser } from '@/next-auth';

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
