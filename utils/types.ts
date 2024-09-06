import { ExtendedUser } from '@/next-auth';
import { Country, Gender, State } from '@prisma/client';
import type { Session } from 'next-auth';

export type NavLink = {
    href: string;
    label: string;
    subMenu?: NavLink[];
};

export type actionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ result: boolean | null; message: string }>;

export interface UserProps {
    user?: ExtendedUser;
}

export interface NavBarProps {
    whiteBackground: boolean;
    session: Session | null;
}

export interface GenderProps {
    genderProp?: Gender;
}

export interface LocationProps {
    stateProp?: State;
    countryProp?: Country;
    countries: Country[];
    states: State[];
    initialValueProp: boolean;
}

export interface DateOfBirthProps {
    dateOfBirthProp?: Date;
}

export interface TwoFactorDialogsProp {
    isOpen: boolean;
    isEdit: boolean;
    onEdit: (edit: boolean) => void;
    onOpen: () => void;
    onClose: () => void;
    data: any;
    setData(data: any): void;
}
