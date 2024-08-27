import { ExtendedUser } from '@/next-auth';
import { Button } from '../ui/button';
import Link from 'next/link';

import useCurrentUser from '@/hooks/useCurrentUser';

interface UserProps {
    user?: ExtendedUser;
}

const UserSection = ({ user }: UserProps) => {
    return (
        <>
            {user ? (
                <p>User logged in</p>
            ) : (
                <Link href="/login">
                    <Button
                        variant="ghost"
                        className="flex rounded text-sm sm:text-md h-11 border border-primary p-2"
                    >
                        Login / Signup
                    </Button>
                </Link>
            )}
        </>
    );
};
export default UserSection;
