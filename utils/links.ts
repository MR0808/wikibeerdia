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
            },
            {
                href: "/education/beer-tasting",
                label: "beer tasting 101"
            }
        ]
    },
    {
        href: "/breweries",
        label: "breweries",
        subMenu: [
            {
                href: "/breweries",
                label: "Find a Brewery"
            },

            {
                href: "/breweries/az",
                label: "A-Z"
            },
            {
                href: "/breweries/map",
                label: "Brewery Map"
            },
            {
                href: "/breweries/country",
                label: "Find by Country"
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
        href: "/beers",
        label: "beer",

        subMenu: [
            {
                href: "/beers",
                label: "Find a Beer"
            },
            {
                href: "/beers/country",
                label: "Find by Country"
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
