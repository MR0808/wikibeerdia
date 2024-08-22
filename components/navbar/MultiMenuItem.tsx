'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavLink } from '@/utils/types';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

function MultiMenuItem({ link }: { link: NavLink }) {
    const pathname = usePathname();
    const isCurrent: boolean =
        pathname.split('/')[1] === link.href.split('/')[1];

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <>
            <div className="py-4 flex items-center cursor-pointer text-white border-dashed border-x-0 border-b-0 border-t">
                <div className="flex justify-between mr-6 w-full items-center">
                    <Link
                        href={link.href}
                        className={cn(
                            `capitalize ml-6 text-lg font-bold ${
                                isCurrent ? 'text-primary' : 'text-foreground'
                            }`
                        )}
                    >
                        {link.label}
                    </Link>
                    {subMenuOpen ? (
                        <BsChevronUp
                            className="text-foreground"
                            onClick={toggleSubMenu}
                        />
                    ) : (
                        <BsChevronDown
                            className="text-foreground"
                            onClick={toggleSubMenu}
                        />
                    )}
                </div>
            </div>
            {subMenuOpen && (
                <div className="flex flex-col text-left text-md pb-4 w-4/5 mx-auto font-bold">
                    {link.subMenu &&
                        link.subMenu.map((subLink, i) => {
                            return (
                                <Link
                                    key={i}
                                    href={subLink.href}
                                    className={cn(
                                        `capitalize p-2 ${
                                            pathname === subLink.href
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`
                                    )}
                                >
                                    {subLink.label}
                                </Link>
                            );
                        })}
                </div>
            )}
        </>
    );
}
export default MultiMenuItem;
