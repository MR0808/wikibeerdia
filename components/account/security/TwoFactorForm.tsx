'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import { Button } from '@/components/ui/button';
import { useTwoFactorDialog } from '@/hooks/useTwoFactorDialog';
import { cn } from '@/lib/utils';

import TwoFactorDisableDialog from './TwoFactorDisableDialog';

const TwoFactorForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const [twoFactor, setTwoFactor] = useState(user?.otpEnabled);
    const { data: newSession, update } = useSession();
    const { onOpen, onEdit, isUpdate } = useTwoFactorDialog();
    const [openDisable, setOpenDisable] = useState(false);

    useEffect(() => {
        update();
    }, [isUpdate]);

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
            setTwoFactor(user?.otpEnabled);
        }
    }, [newSession]);

    return (
        <div className="flex flex-col gap-5 pb-8 mt-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">
                    Mobile App Authentication (2FA)
                </h3>
                <div
                    className={`cursor-pointer text-base font-normal hover:underline ${
                        user?.otpEnabled && 'font-semibold text-primary'
                    }`}
                >
                    {user?.otpEnabled ? 'Enabled' : 'Disabled'}
                </div>
            </div>
            <div className="flex-1">
                {user?.otpEnabled ? (
                    <div className="flex gap-x-3">
                        <Button
                            className={cn('')}
                            onClick={() => setOpenDisable(true)}
                        >
                            Disable
                        </Button>
                        <Button
                            className={cn('')}
                            onClick={() => {
                                onOpen();
                                onEdit(true);
                            }}
                        >
                            Reset Recovery Codes
                        </Button>
                        <TwoFactorDisableDialog
                            openDisable={openDisable}
                            setOpenDisable={setOpenDisable}
                        />
                    </div>
                ) : (
                    <Button
                        className={cn('')}
                        onClick={() => {
                            onOpen();
                            onEdit(true);
                        }}
                    >
                        Setup 2FA
                    </Button>
                )}
            </div>
        </div>
    );
};
export default TwoFactorForm;
