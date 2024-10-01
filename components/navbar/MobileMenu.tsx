import { Menu, Search } from "lucide-react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/public/images/logo-black.png";
import { links } from "@/utils/links";
import SingleMenuItem from "./SingleMenuItem";
import MultiMenuItem from "./MultiMenuItem";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="rounded bg-primary p-1">
          <Menu className="text-4xl text-white" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="p-5">
          <SheetTitle>
            <Image src={logo} alt="Wikibeerdia" className="w-[200px]" />
          </SheetTitle>
        </SheetHeader>
        <div className="grid py-4">
          <div className="py-4">
            <div className="mx-5 flex cursor-pointer items-center rounded-md border border-foreground bg-transparent p-2.5 px-4 text-foreground duration-300">
              <Search />
              <input
                type="search"
                placeholder="Search Beers..."
                className="ml-4 w-full border-none bg-transparent text-[15px] text-foreground focus:border-none focus:outline-none"
              />
            </div>
          </div>
          {links.map((link, index) => {
            return link.subMenu ? (
              <MultiMenuItem link={link} key={index} />
            ) : (
              <SingleMenuItem link={link} key={index} />
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileMenu;
