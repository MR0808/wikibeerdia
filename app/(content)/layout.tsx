import Navbar from '@/components/navbar/Navbar';
import { currentUser } from '@/lib/auth';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar user={user} />
            <div className="flex-1">{children}</div>
        </div>
    );
};
export default PublicLayout;
