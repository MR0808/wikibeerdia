'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const OauthButtons = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    const onClick = (provider: 'google') => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    };

    return (
        <>
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex items-center w-full gap-x-2">
                <Button
                    size="lg"
                    className={cn('capitalize w-full rounded-full h-12')}
                    variant="outline"
                    onClick={() => onClick('google')}
                >
                    <FcGoogle className="h-5 w-5 mr-2" /> Sign in with Google
                </Button>
            </div>
        </>
    );
};

export default OauthButtons;
