import * as React from 'react';
import Link from 'next/link';
import { links } from '@/utils/links';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

export function NavLinks() {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    {links.map((link, index) => {
                        return link.subMenu ? (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'flex items-center text-lg font-medium text-foreground hover:text-primary capitalize'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px]">
                                        {link.subMenu.map((subLink, i) => {
                                            return (
                                                <ListItem
                                                    href={subLink.href}
                                                    title={subLink.label}
                                                    key={i}
                                                >
                                                    {subLink.label}
                                                </ListItem>
                                            );
                                        })}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem key={index}>
                                <Link href={link.href} passHref legacyBehavior>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <div className="flex items-center text-lg font-medium text-foreground hover:text-primary capitalize">
                                            {link.label}
                                        </div>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}
export default NavLinks;

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
