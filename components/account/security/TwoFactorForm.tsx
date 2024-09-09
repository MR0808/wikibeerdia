'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import TwoFactorSetupDialog from './TwoFactorSetupDialog';
import TwoFactorDisableDialog from './TwoFactorDisableDialog';
import TwoFactorBackupDialog from './TwoFactorBackupDialog'

const TwoFactorForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const { data: newSession, update } = useSession();
    const [openSetup, setOpenSetup] = useState(false);
    const [openDisable, setOpenDisable] = useState(false);
    const [openBackup, setOpenBackup] = useState(false);

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
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
                            onClick={() => setOpenBackup(true)}
                        >
                            Reset Recovery Codes
                        </Button>
                        <TwoFactorDisableDialog
                            openDisable={openDisable}
                            setOpenDisable={setOpenDisable}
                        />
                        <TwoFactorBackupDialog
                            openBackup={openBackup}
                            setOpenBackup={setOpenBackup}
                        />
                    </div>
                ) : (
                    <>
                        <Button
                            className={cn('')}
                            onClick={() => setOpenSetup(true)}
                        >
                            Setup 2FA
                        </Button>
                        <TwoFactorSetupDialog
                        openSetup={openSetup}
                        setOpenSetup={setOpenSetup}
                        session={session}
                    />
                </>
                )}
            </div>
        </div>
    );
};
export default TwoFactorForm;
