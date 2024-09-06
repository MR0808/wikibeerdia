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
import { disableTwoFactor } from '@/actions/security';

interface TwoFactorDisableDialogProps {
    openDisable: boolean;
    setOpenDisable: Dispatch<SetStateAction<boolean>>;
    backupCodes: string[];
}

const TwoFactorDisableDialog = ({
    openDisable,
    setOpenDisable,
    backupCodes
}: TwoFactorDisableDialogProps) => {
    const { update } = useSession();
    const [isPending, setIsPending] = useState(false);

    const onSubmit = async () => {
        setIsPending(true);
        await disableTwoFactor();
        update();
        setOpenDisable(false);
        setIsPending(false);
    };

    return (
        <Dialog
            open={openDisable}
            onOpenChange={() => setOpenDisable((prevOpen) => !prevOpen)}
        >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you wish to disabled two factor
                        authentication?
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your authentication token and you will need to
                        start again.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setOpenDisable(false)}>Close</Button>
                    <Button onClick={onSubmit} disabled={isPending}>
                        {isPending ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            'Confrim'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TwoFactorDisableDialog;
