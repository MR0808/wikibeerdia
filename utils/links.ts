import { NavLink } from './types';

export const links: NavLink[] = [
    // { href: '/', label: 'home' },
    {
        href: '/education',
        label: 'education',
        subMenu: [
            {
                href: '/education/beer',
                label: 'how beer is made'
            }
        ]
    },
    {
        href: '/breweries',
        label: 'breweries',
        subMenu: [
            {
                href: '/breweries/popular',
                label: 'popular'
            },
            {
                href: '/breweries/az',
                label: 'A-Z'
            }
        ]
    },
    {
        href: '/beer',
        label: 'beer',

        subMenu: [
            {
                href: '/beer/popular',
                label: 'popular'
            }
        ]
    },
    { href: '/blog', label: 'blog' }
    // { href: '/contact', label: 'contact' }
];

export const accountLinks: NavLink[] = [
    { href: '/profile', label: 'profile' },
    { href: '/account', label: 'account' },
    { href: '/logout', label: 'logout' }
];
