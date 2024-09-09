'use client';

import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { resetBackupCodes } from '@/actions/security';
import { cn } from '@/lib/utils'

interface TwoFactorBackupDialogProps {
    openBackup: boolean;
    setOpenBackup: Dispatch<SetStateAction<boolean>>;
}

const TwoFactorBackupDialog = ({
    openBackup,
    setOpenBackup
}: TwoFactorBackupDialogProps) => {
    const { update } = useSession();
    const [isPending, setIsPending] = useState(false);
    const [confirm, setConfirm] = useState(true)
    const [backupCodes, setBackupCodes] = useState<string[]>();

    const onSubmit = async () => {
        setIsPending(true);
        const codes = await resetBackupCodes();
        setBackupCodes(codes.recoveryCodes);
        update();
        setIsPending(false);
        setConfirm(false)
    };

    const closeDialog = () => {
        setOpenBackup(false)
        setBackupCodes([])
        setConfirm(true)
    }

    return (
        <Dialog
            open={openBackup}
            onOpenChange={() => setOpenBackup((prevOpen) => !prevOpen)}
        >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
                {confirm ? 
                (<>
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you wish to reset your backup codes?
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your current backup codes and you will need to save the new ones.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setOpenBackup(false)}>Close</Button>
                        <Button onClick={onSubmit} disabled={isPending}>
                            {isPending ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                'Confirm'
                            )}
                        </Button>
                    </DialogFooter>
                </>) : (
                    <div className="px-6">
                        <div className="text-xl text-primary pb-5">
                            Your recovery codes have been reset
                        </div>
                        <p className="mb-3">
                            Please copy your backup codes below as these will
                            not be possible to retrieve again
                        </p>
                        <ul className="list-disc px-6 mb-3">
                            {backupCodes?.map((code, i) => {
                                return <li key={i}>{code}</li>;
                            })}
                        </ul>
                        <DialogFooter className="px-6 py-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                className={cn('capitalize')}
                                size="lg"
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TwoFactorBackupDialog;
