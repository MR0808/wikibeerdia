import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavLink } from '@/utils/types';

function SingleMenuItem({ link }: { link: NavLink }) {
    const pathname = usePathname();
    const isCurrent: boolean =
        pathname.split('/')[1] === link.href.split('/')[1];

    return (
        <div className="py-4 flex items-center cursor-pointer text-white border-dashed border-x-0 border-b-0 border-t capitalize">
            <Link
                href={link.href}
                className={cn(
                    `ml-6 text-lg font-bold ${
                        isCurrent ? 'text-primary' : 'text-foreground'
                    }`
                )}
            >
                {link.label}
            </Link>
        </div>
    );
}
export default SingleMenuItem;
