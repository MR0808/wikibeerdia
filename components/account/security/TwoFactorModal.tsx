import { z } from 'zod';

import { useForm } from 'react-hook-form';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { useTwoFactorDialog } from '@/hooks/useTwoFactorDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { TwoFactorSchema } from '@/schemas/auth';

const TwoFactorModal = () => {
    const { isOpen, onClose } = useTwoFactorDialog();

    const form = useForm({
        resolver: zodResolver(TwoFactorSchema),
        defaultValues: {
            code: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    function onSubmit(values: z.infer<typeof TwoFactorSchema>) {
        console.log(values);
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="p-0 overflow-hidden"
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-3xl text-left font-bold">
                        Two-Factor Authentication
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-4 px-6">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter task name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="px-6 py-4">
                            <Button disabled={isLoading}>Create</Button>
                            <Button onClick={onClose}>Close</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
export default TwoFactorModal;
