import { headers } from 'next/headers';

import Navbar from '@/components/navbar/Navbar';
import { currentUser } from '@/lib/auth';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();
    const headersList = headers();
    const url = new URL(headersList.get('referer') || '');
    const pathname = url.pathname;

    const pagesTransparent = ['/'];
    const gapClass = !pagesTransparent.includes(pathname)
        ? 'flex-1 mt-28'
        : 'flex-1';

    const pagesWhite = ['/'];

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar
                user={user}
                pagesTransparent={pagesTransparent}
                pagesWhite={pagesWhite}
                pathname={pathname}
            />
            <div className={gapClass}>{children}</div>
        </div>
    );
};
export default PublicLayout;
