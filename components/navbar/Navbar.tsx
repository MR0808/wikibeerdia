'use client';
import NavSearch from './NavSearch';
import NavLinks from './NavLinks';
import LoginModal from './LoginModal';
import Logo from './Logo';
import { useState, useEffect } from 'react';

function Navbar() {
    const [scrollActive, setScrollActive] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollActive(window.scrollY > 100);
        });
    }, []);
    return (
        <div
            className={`fixed py-4 left-0 top-0 z-40 flex w-full items-center justify-center transition duration-500 ${
                scrollActive ? 'bg-orange-900' : 'bg-transparent'
            }`}
        >
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex">
                    <Logo />
                </div>
                <div className="flex gap-6 md:gap-10">
                    <NavLinks />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <NavSearch />
                </div>
                <div className="flex items-center justify-end space-x-2">
                    <LoginModal />
                </div>
            </div>
        </div>
    );
}
export default Navbar;
