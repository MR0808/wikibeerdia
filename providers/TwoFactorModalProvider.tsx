'use client';

import { useEffect, useState } from 'react';
import type { Session } from 'next-auth';

import TwoFactorModal from '@/components/account/security/TwoFactorModal';

export const TwoFactorModalProvider = ({
    session
}: {
    session: Session | null;
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <TwoFactorModal session={session} />
        </>
    );
};
export default TwoFactorModalProvider;
