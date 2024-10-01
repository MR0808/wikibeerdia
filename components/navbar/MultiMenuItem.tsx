"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { NavLink } from "@/utils/types";

const MultiMenuItem = ({ link }: { link: NavLink }) => {
  const pathname = usePathname();
  const isCurrent: boolean = pathname.split("/")[1] === link.href.split("/")[1];

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
      <div className="flex cursor-pointer items-center border-x-0 border-b-0 border-t border-dashed py-4 text-white">
        <div className="mr-6 flex w-full items-center justify-between">
          <Link
            href={link.href}
            className={cn(
              `ml-6 text-lg font-bold capitalize ${
                isCurrent ? "text-primary" : "text-foreground"
              }`,
            )}
          >
            {link.label}
          </Link>
          {subMenuOpen ? (
            <ChevronUp className="text-foreground" onClick={toggleSubMenu} />
          ) : (
            <ChevronDown className="text-foreground" onClick={toggleSubMenu} />
          )}
        </div>
      </div>
      {subMenuOpen && (
        <div className="text-md mx-auto flex w-4/5 flex-col pb-4 text-left font-bold">
          {link.subMenu &&
            link.subMenu.map((subLink, i) => {
              return (
                <Link
                  key={i}
                  href={subLink.href}
                  className={cn(
                    `p-2 capitalize ${
                      pathname === subLink.href
                        ? "text-primary"
                        : "text-foreground"
                    }`,
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
};
export default MultiMenuItem;
