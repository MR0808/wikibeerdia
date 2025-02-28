import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavLink } from "@/utils/types";

const SingleMenuItem = ({
    link,
    setIsOpen
}: {
    link: NavLink;
    setIsOpen: (open: boolean) => void;
}) => {
    const pathname = usePathname();
    const isCurrent: boolean =
        pathname.split("/")[1] === link.href.split("/")[1];

    return (
        <div className="flex cursor-pointer items-center border-x-0 border-t border-b-0 border-dashed py-4 text-white capitalize">
            <Link
                href={link.href}
                className={cn(
                    `ml-6 text-lg font-bold ${
                        isCurrent ? "text-primary" : "text-foreground"
                    }`
                )}
                onClick={() => setIsOpen(false)}
            >
                {link.label}
            </Link>
        </div>
    );
};
export default SingleMenuItem;
