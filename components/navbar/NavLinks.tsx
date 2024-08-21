import * as React from 'react';
import Link from 'next/link';
import { links } from '@/utils/links';
import { cn } from '@/lib/utils';
import { BsChevronDown } from 'react-icons/bs';

export function NavLinks() {
    return (
        <ul className="block lg:flex uppercase">
            {links.map((link, index) => {
                return link.subMenu ? (
                    <li className="submenu-item group relative" key={index}>
                        <Link
                            href={link.href}
                            className={cn(
                                'relative mx-8 flex items-center justify-between py-2 text-base font-medium text-dark group-hover:text-primary lg:ml-8 lg:mr-0 lg:inline-flex lg:pt-6 lg:pl-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10 [&.active]:border-b-2'
                            )}
                        >
                            {link.label}
                            <BsChevronDown className="ml-2 fill-current hidden md:block" />
                        </Link>
                        <div className="submenu relative left-0 top-full hidden w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full">
                            {link.subMenu.map((subLink, i) => {
                                return (
                                    <Link
                                        href={subLink.href}
                                        key={i}
                                        className={cn(
                                            'block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary capitalize'
                                        )}
                                    >
                                        {subLink.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </li>
                ) : (
                    <li className="group relative" key={index}>
                        <Link
                            href={link.href}
                            className={cn(
                                'mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 uppercase [&.active]:border-b-2 hover:border-b-2'
                            )}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
export default NavLinks;
