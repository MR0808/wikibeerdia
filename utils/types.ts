export type NavLink = {
    href: string;
    label: string;
    auth: boolean;
    admin: boolean;
    subMenu?: NavLink[];
};

export type actionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ message: string }>;
