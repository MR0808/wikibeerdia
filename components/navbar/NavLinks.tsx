import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";

import { links } from "@/utils/links";
import { cn } from "@/lib/utils";

const NavLinks = ({ session }: { session: Session | null }) => {
    const user = session?.user;
    const pathname = usePathname();

    return (
        <ul className="block uppercase lg:flex">
            {links.map((link, index) => {
                const isCurrent: boolean =
                    pathname.split("/")[1] === link.href.split("/")[1];
                return link.subMenu
                    ? (!link.auth || (link.auth && user)) && (
                          <li
                              className="submenu-item group relative"
                              key={index}
                          >
                              <Link
                                  href={link.href}
                                  className={cn(
                                      `text-dark relative mx-8 flex items-center justify-between py-2 text-base font-medium group-hover:text-primary lg:ml-8 lg:mr-0 lg:inline-flex lg:pl-0 lg:pt-6 lg:group-hover:text-primary xl:ml-10 ${
                                          isCurrent && "text-primary"
                                      }`
                                  )}
                              >
                                  {link.label}
                                  <ChevronDown className="ml-2 hidden md:block" />
                              </Link>
                              <div className="submenu relative left-0 top-full hidden w-[200px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:text-foreground lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full">
                                  {link.subMenu.map((subLink, i) => {
                                      if (
                                          !subLink.auth ||
                                          (subLink.auth && user)
                                      ) {
                                          return (
                                              <Link
                                                  href={subLink.href}
                                                  key={i}
                                                  className={cn(
                                                      `text-body-color block px-4 py-[10px] text-sm capitalize hover:text-primary ${
                                                          pathname ===
                                                              subLink.href &&
                                                          "text-primary"
                                                      } ${subLink.border && "mt-5 border-t"}`
                                                  )}
                                              >
                                                  {subLink.label}
                                              </Link>
                                          );
                                      }
                                  })}
                              </div>
                          </li>
                      )
                    : (!link.auth || (link.auth && user)) && (
                          <li className="group relative" key={index}>
                              <Link
                                  href={link.href}
                                  className={cn(
                                      `text-dark mx-8 flex py-2 text-base font-medium uppercase group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:group-hover:text-primary ${
                                          isCurrent && "text-primary"
                                      }`
                                  )}
                              >
                                  {link.label}
                              </Link>
                          </li>
                      );
            })}
        </ul>
    );
};

export default NavLinks;
