import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { useEffect, useState, useTransition } from 'react';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import QRCode from 'react-qr-code';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { useTwoFactorDialog } from '@/hooks/useTwoFactorDialog';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AccountFormInput } from '@/components/form/FormInput';

import { cn } from '@/lib/utils';
import { TwoFactorSchema } from '@/schemas/auth';
import { SubmitButton } from '@/components/form/Buttons';

const TwoFactorModal = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const { isOpen, onClose, isEdit, onEdit } = useTwoFactorDialog();
    const [qrData, setQRData] = useState<string>();
    const [qrSecret, setQRSecret] = useState<string>();
    const { data: newSession, update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(TwoFactorSchema),
        defaultValues: {
            token: ''
        }
    });

    const closeModal = () => {
        onClose();
        onEdit(false);
    };

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
            setQRData(data.otpurl);
            setQRSecret(data.secret);
        };
        isEdit && fetchQRCode();
    }, [isEdit]);

    const verifyOtp = async (token: string) => {
        const response = await fetch(`/api/2fa/qrcode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${user?.firstName} ${user?.lastName}`,
                secret: qrSecret,
                token
            })
        });
        const data = await response.json();
        if (data.result) {
        }
    };

    function onSubmit(values: z.infer<typeof TwoFactorSchema>) {
        startTransition(() => {
            verifyOtp(values.token);
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    'p-0 overflow-hidden max-w-[700px] mx-4 sm:mx-6 md:mx-8 lg:mx-10'
                )}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className="pt-8 px-6 border-b pb-4">
                    <DialogTitle className="text-3xl text-left font-bold">
                        Two-Factor Authentication
                    </DialogTitle>
                </DialogHeader>
                <div className="px-6">
                    <div className="text-xl text-primary pb-5">
                        Configuring Google Authenticator or Authy
                    </div>
                    <ol className="list-decimal px-6">
                        <li>Install Google Authenticator or Authy.</li>
                        <li>In the authenticator app, select '+' icon.</li>
                        <li>
                            Select 'Scan a barcode (or QR code)' and use the
                            phone's camera to scan this barcode.
                        </li>
                    </ol>
                    <div className="text-xl text-primary py-5">
                        Scan QR Code
                    </div>
                    {qrData && (
                        <>
                            <QRCode
                                size={192}
                                style={{
                                    height: '196px',
                                    maxWidth: '100%',
                                    width: '196px'
                                }}
                                value={qrData!}
                                viewBox={`0 0 196 196`}
                            />
                        </>
                    )}
                    <div className="text-xl text-primary py-5">Verify Code</div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="token"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Please enter the code below to
                                                verify that the authentication
                                                worked:
                                            </FormLabel>
                                            <FormControl>
                                                <AccountFormInput
                                                    {...field}
                                                    name="token"
                                                    type="text"
                                                    placeholder="Enter code"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter className="px-6 py-4">
                                <SubmitButton
                                    text="Verify"
                                    isPending={isPending}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isPending}
                                    onClick={closeModal}
                                    className={cn('capitalize')}
                                    size="lg"
                                >
                                    Cancel
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default TwoFactorModal;
