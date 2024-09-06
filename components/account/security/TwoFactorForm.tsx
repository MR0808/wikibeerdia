'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { useTwoFactorDialog } from '@/hooks/useTwoFactorDialog';
import { cn } from '@/lib/utils';
import { disableTwoFactor } from '@/actions/security';

const TwoFactorForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const [twoFactor, setTwoFactor] = useState(user?.otpEnabled);
    const { data: newSession, update } = useSession();
    const { onOpen, onEdit, isUpdate } = useTwoFactorDialog();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
            setTwoFactor(user?.otpEnabled);
        }
    }, [newSession, isUpdate]);

    const onSubmit = async () => {
        await disableTwoFactor();
        update();
    };

    return (
        <div className="flex flex-col gap-5 pb-8 mt-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">
                    Mobile App Authentication (2FA)
                </h3>
                <div
                    className={`cursor-pointer text-base font-normal hover:underline ${
                        twoFactor && 'font-semibold text-primary'
                    }`}
                >
                    {twoFactor ? 'Enabled' : 'Disabled'}
                </div>
            </div>
            <div className="flex-1">
                {twoFactor ? (
                    <div className="flex gap-x-3">
                        <Button
                            className={cn('')}
                            onClick={() => setOpen(true)}
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
                        <AlertDialog
                            open={open}
                            onOpenChange={() =>
                                setOpen((prevOpen) => !prevOpen)
                            }
                        >
                            <AlertDialogTrigger asChild></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure you wish to disabled two
                                        factor authentication?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your authentication
                                        token and you will need to start again.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={onSubmit}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
