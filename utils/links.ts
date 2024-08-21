type NavLink = {
    href: string;
    label: string;
    auth: boolean;
    admin: boolean;
    subMenu?: NavLink[];
};

export const links: NavLink[] = [
    { href: '/', label: 'home', auth: false, admin: false },
    {
        href: '/education',
        label: 'education',
        auth: false,
        admin: false,
        subMenu: [
            {
                href: '/education/beer',
                label: 'how beer is made',
                auth: false,
                admin: false
            }
        ]
    },
    {
        href: '/breweries',
        label: 'home',
        auth: false,
        admin: false,
        subMenu: [
            {
                href: '/breweries/popular',
                label: 'popular',
                auth: false,
                admin: false
            }
        ]
    },
    {
        href: '/beer',
        label: 'beer',
        auth: false,
        admin: false,
        subMenu: [
            {
                href: '/breweries/popular',
                label: 'popular',
                auth: false,
                admin: false
            }
        ]
    },
    { href: '/blog', label: 'blog', auth: false, admin: false },
    { href: '/contact', label: 'contact', auth: false, admin: false }
];
