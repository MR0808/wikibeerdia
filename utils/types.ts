import * as z from "zod";
import { ExtendedUser } from "@/next-auth";
import { Country, Gender, State, Status } from "@prisma/client";
import type { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

import { typesSearchParamsSchema, SearchParamsSchema } from "@/schemas/admin";

export type NavLink = {
    href: string;
    label: string;
    subMenu?: NavLink[];
    border?: boolean;
    auth?: boolean;
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
    isUpdate: boolean;
    onUpdate: (update: boolean) => void;
}

export interface BackupCodesDialogsProp {
    isOpen: boolean;
    isEdit: boolean;
    onEdit: (edit: boolean) => void;
    onOpen: () => void;
    onClose: () => void;
}

export interface TwoFactorProps {
    otpAuthUrl: string;
    otpBase32: string;
    otpBackups: string[];
}

export const statusLabels: { value: Status; label: string }[] = [
    { value: Status.DRAFT, label: "Draft" },
    { value: Status.PENDING, label: "Pending" },
    { value: Status.APPROVED, label: "Approved" },
    { value: Status.DISABLED, label: "Disabled" },
    { value: Status.REJECTED, label: "Rejected" }
];

export interface BreweryTypeProps {
    nameProp?: string;
    statusProp?: Status;
    id?: string;
}

export interface BreweryFormProps extends BreweryTypeProps {
    className?: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export type Params = Promise<{ id: string }>;
export type SearchParams = Promise<{
    [key: string]: string | string[] | undefined;
}>;

export type GetTypesSchema = z.infer<typeof typesSearchParamsSchema>;

export type GetSearchSchema = z.infer<typeof SearchParamsSchema>;

export interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    withCount?: boolean;
}

export interface DataTableFilterField<TData> {
    label: string;
    value: keyof TData;
    placeholder?: string;
    options?: Option[];
}

export interface DataTableFilterOption<TData> {
    id: string;
    label: string;
    value: keyof TData;
    options: Option[];
    filterValues?: string[];
    filterOperator?: string;
    isMulti?: boolean;
}

export interface StyleProps {
    subStyles: {
        name: string;
        status: Status;
        id: string;
    }[];
    parentStyle: {
        name: string;
        id: string;
    };
    id: string;
    name: string;
    status: Status;
    description: string | null;
    createdAt: Date;
}
