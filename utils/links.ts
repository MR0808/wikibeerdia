import { NavLink } from "./types";

export const links: NavLink[] = [
    // { href: '/', label: 'home' },
    {
        href: "/education",
        label: "education",
        subMenu: [
            {
                href: "/education/beer-process",
                label: "how beer is made"
            },
            {
                href: "/education/beer-styles",
                label: "beer styles"
            }
        ]
    },
    {
        href: "/breweries",
        label: "breweries",
        subMenu: [
            {
                href: "/breweries/popular",
                label: "popular"
            },
            {
                href: "/breweries/az",
                label: "A-Z"
            },
            {
                href: "/breweries/submit",
                label: "Submit Brewery",
                border: true,
                auth: true
            }
        ]
    },
    {
        href: "/beer",
        label: "beer",

        subMenu: [
            {
                href: "/beers/popular",
                label: "popular"
            },
            {
                href: "/beers/submit",
                label: "Submit Beer",
                border: true,
                auth: true
            }
        ]
    },
    { href: "/blog", label: "blog" }
    // { href: '/contact', label: 'contact' }
];

export const accountLinks: NavLink[] = [
    { href: "/profile", label: "profile" },
    { href: "/account", label: "account" },
    { href: "/logout", label: "logout" }
];
