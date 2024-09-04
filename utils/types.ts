import { ExtendedUser } from '@/next-auth';
import { Country, Gender, State } from '@prisma/client';

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
