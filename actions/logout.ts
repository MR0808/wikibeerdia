// 'use server';

// import { signOut } from '@/auth';

// export const logout = async () => {
//     await signOut({ redirectTo: '/', redirect: true });
// };

'use client';

import { signOut } from 'next-auth/react';

export const logout = () => {
    signOut({ callbackUrl: '/' });
};
