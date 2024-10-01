"use client";

import { useState, useEffect } from "react";

import NavSearch from "./NavSearch";
import NavLinks from "./NavLinks";
import UserSection from "./UserSection";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { NavBarProps } from "@/utils/types";

const Navbar = ({ whiteBackground, session }: NavBarProps) => {
    const [scrollActive, setScrollActive] = useState(false);

    const bgClass = whiteBackground
        ? " bg-white shadow-[0_13px_35px_-12px_rgba(35,35,35,0.1)] text-foreground"
        : " bg-black shadow-[0_13px_35px_-12px_rgba(35,35,35,0.1)] text-white";

    useEffect(() => {
        if (whiteBackground) {
            window.addEventListener("scroll", () => {
                setScrollActive(window.scrollY > 100);
            });
        } else {
            setScrollActive(true);
        }
    }, []);

    return (
        <div
            className={`fixed left-0 top-0 z-40 flex w-full items-center justify-center py-4 transition duration-500 ${
                scrollActive ? bgClass : "bg-transparent text-white"
            }`}
        >
            <div className="container flex h-16 items-center justify-between space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex">
                    <Logo
                        whiteBackground={scrollActive ? whiteBackground : false}
                    />
                </div>
                <div className="hidden gap-6 sm:flex md:gap-10">
                    <NavLinks />
                </div>

                <div className="hidden items-center justify-end space-x-4 sm:flex">
                    <NavSearch />
                </div>
                <div className="ml-5 flex items-center justify-end space-x-3">
                    <UserSection session={session} />
                </div>
                <div className="flex gap-6 sm:hidden md:gap-10">
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
};
export default Navbar;
