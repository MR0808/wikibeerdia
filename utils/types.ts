export type NavLink = {
    href: string;
    label: string;
    auth: boolean;
    admin: boolean;
    subMenu?: NavLink[];
};
