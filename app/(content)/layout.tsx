import { headers } from 'next/headers';

import Navbar from '@/components/navbar/Navbar';
import { currentUser } from '@/lib/auth';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();
    const pages = ['/'];
    const headerList = headers();
    const pathname = headerList.get('x-current-path') || '/';
    const gapClass = !pages.includes(pathname) ? 'flex-1 mt-28' : 'flex-1';

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar user={user} pages={pages} pathname={pathname} />
            <div className={gapClass}>{children}</div>
        </div>
    );
};
export default PublicLayout;
