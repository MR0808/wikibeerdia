'use client';

import { useEffect, useState } from 'react';
import TwoFactorModal from '@/components/account/security/TwoFactorModal';

export const TwoFactorModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <TwoFactorModal />
        </>
    );
};
export default TwoFactorModalProvider;
