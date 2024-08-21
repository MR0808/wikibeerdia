import Link from 'next/link';
import { links } from '@/utils/links';
import Logo from './Logo';
import { cn } from '@/lib/utils';

export function NavLinks() {
    return (
        <>
            <Logo />
            {links?.length ? (
                <nav className="flex gap-6">
                    {links?.map(
                        (link, index) =>
                            link.href && (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={cn(
                                        'flex items-center text-lg font-medium text-foreground hover:text-primary capitalize'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            )
                    )}
                </nav>
            ) : null}
        </>
    );
}
export default NavLinks;
