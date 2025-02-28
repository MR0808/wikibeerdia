"use client";

import { useState } from "react";

import { Menu, Search } from "lucide-react";
import Image from "next/image";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import logo from "@/public/images/logo-black.png";
import { links } from "@/utils/links";
import SingleMenuItem from "./SingleMenuItem";
import MultiMenuItem from "./MultiMenuItem";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div className="bg-primary rounded p-1">
                    <Menu className="text-4xl text-white" />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetHeader className="p-5">
                    <SheetTitle>
                        <Image
                            src={logo}
                            alt="Wikibeerdia"
                            className="w-[200px]"
                        />
                    </SheetTitle>
                </SheetHeader>
                <div className="grid py-4">
                    <div className="py-4">
                        <div className="border-foreground text-foreground mx-5 flex cursor-pointer items-center rounded-md border bg-transparent p-2.5 px-4 duration-300">
                            <Search />
                            <input
                                type="search"
                                placeholder="Search Beers..."
                                className="text-foreground ml-4 w-full border-none bg-transparent text-[15px] focus:border-none focus:outline-hidden"
                            />
                        </div>
                    </div>
                    {links.map((link, index) => {
                        return link.subMenu ? (
                            <MultiMenuItem
                                key={index}
                                link={link}
                                setIsOpen={setIsOpen}
                            />
                        ) : (
                            <SingleMenuItem
                                key={index}
                                link={link}
                                setIsOpen={setIsOpen}
                            />
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
};
export default MobileMenu;
