import { usePathname } from 'next/navigation';

import Navbar from '@/components/navbar/Navbar';
import { currentUser } from '@/lib/auth';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();
    const pages = ['/'];
    const pathname = usePathname();

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar user={user} pages={pages} pathname={pathname} />
            <div className="flex-1">{children}</div>
        </div>
    );
};
export default PublicLayout;
