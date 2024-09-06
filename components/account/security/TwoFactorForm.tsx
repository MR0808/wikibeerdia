'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTwoFactorDialog } from '@/hooks/useTwoFactorDialog';

const TwoFactorForm = ({
    session,
    isTwoFactorEnabled
}: {
    session: Session | null;
    isTwoFactorEnabled: boolean;
}) => {
    const [user, setUser] = useState(session?.user);
    const [twoFactor, setTwoFactor] = useState(isTwoFactorEnabled);
    const [edit, setEdit] = useState(false);
    const { data: newSession, update } = useSession();
    const { onOpen, onEdit } = useTwoFactorDialog();

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    useEffect(() => {
        const fetchQRCode = async () => {
            const response = await fetch(`/api/2fa/qrcode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${user?.firstName} ${user?.lastName}`
                })
            });
            const data = await response.json();
        };
        fetchQRCode();
    }, []);

    const cancel = () => {
        setEdit(!edit);
    };

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8 mt-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">
                    Two Factor Authentication
                </h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <>
                    <Button
                        onClick={() => {
                            onOpen();
                            onEdit(true);
                        }}
                    >
                        Create
                    </Button>
                </>
            ) : (
                <div>{twoFactor ? 'Enabled' : 'Disabled'}</div>
            )}
        </div>
    );
};
export default TwoFactorForm;
