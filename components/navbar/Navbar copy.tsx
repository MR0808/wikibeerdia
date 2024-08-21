import NavSearch from './NavSearch';
import NavLinks from './NavLinks';
import LoginModal from './LoginModal';
import Logo from './Logo';
import { useState, useEffect } from 'react';

function Navbar() {
    const [scrollActive, setScrollActive] = useState(false);
    const [navbarShow, setNavbarShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollActive(window.scrollY > 100);
        });
    }, []);
    return (
        <header className="bg-black sticky top-0 z-40 w-full border-b py-6">
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
        </header>
    );
}
export default Navbar;
