import Link from "next/link";

import { BeerStylesParent } from "@/types/education";

const TableOfContentsItem = ({
    item,
    level = "two"
}: {
    item: BeerStylesParent;
    level?: string;
}) => {
    return (
        <li className="py-1">
            <Link
                href={`#${item.slug}`}
                data-level={level}
                className="border-dark/40 flex items-center justify-start border-solid data-[level=three]:pl-4 data-[level=two]:border-t data-[level=two]:pt-2 data-[level=two]:pl-0 sm:data-[level=three]:pl-6"
            >
                {level === "three" && (
                    <span className="bg-dark mr-2 flex h-1 w-1 rounded-full">
                        &nbsp;
                    </span>
                )}
                <span className="hover:underline">{item.name}</span>
            </Link>
            {item.subStyles && (
                <ul className="mt-1">
                    {item.subStyles.map((subItem, index) => (
                        <TableOfContentsItem
                            key={index}
                            item={subItem}
                            level="three"
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TableOfContentsItem;
