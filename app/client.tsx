'use client';

import { updateUser } from '@/actions/user';
import { ActionButton } from '@/components/global/action-button';
import { FormError } from '@/components/global/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@prisma/client';
import { useFormState } from 'react-dom';

export function RootClient({ user }: { user: User }) {
    const [state, action] = useFormState(updateUser, null);

    return (
        <form action={action} className="grid gap-4">
            <input type="hidden" name="id" value={user.id} />
            <FormError hidden value={state?.errors.id} />

            <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                    id="firstName"
                    name="firstName"
                    placeholder={user.firstName ?? 'Max'}
                    defaultValue={user.firstName ?? ''}
                />
                <FormError value={state?.errors.firstName} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                    id="lastName"
                    name="lastName"
                    placeholder={user.lastName ?? 'Robinson'}
                    defaultValue={user.lastName ?? ''}
                />
                <FormError value={state?.errors.lastName} />
            </div>
            <ActionButton>Update user</ActionButton>
        </form>
    );
}
