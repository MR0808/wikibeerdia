'use client';

import { useState, useEffect } from 'react';

import NavSearch from './NavSearch';
import NavLinks from './NavLinks';
import UserSection from './UserSection';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { NavBarProps } from '@/utils/types';

const Navbar = ({ whiteBackground, session }: NavBarProps) => {
    const [scrollActive, setScrollActive] = useState(false);

    const bgClass = whiteBackground
        ? ' bg-white shadow-[0_13px_35px_-12px_rgba(35,35,35,0.1)] text-foreground'
        : ' bg-black shadow-[0_13px_35px_-12px_rgba(35,35,35,0.1)] text-white';

    useEffect(() => {
        if (whiteBackground) {
            window.addEventListener('scroll', () => {
                setScrollActive(window.scrollY > 100);
            });
        } else {
            setScrollActive(true);
        }
    }, []);

    return (
        <div
            className={`fixed py-4 left-0 top-0 z-40 flex w-full items-center justify-center transition duration-500 ${
                scrollActive ? bgClass : 'bg-transparent text-white'
            }`}
        >
            <div className="container flex h-16 items-center space-x-4 sm:justify-between justify-between sm:space-x-0">
                <div className="flex">
                    <Logo
                        whiteBackground={scrollActive ? whiteBackground : false}
                    />
                </div>
                <div className="sm:flex gap-6 md:gap-10 hidden">
                    <NavLinks />
                </div>

                <div className="sm:flex hidden items-center justify-end space-x-4">
                    <NavSearch />
                </div>
                <div className="flex items-center justify-end space-x-3 ml-5">
                    <UserSection session={session} />
                </div>
                <div className="sm:hidden gap-6 md:gap-10 flex">
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
};
export default Navbar;
