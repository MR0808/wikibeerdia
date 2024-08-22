'use client';

import { register } from '@/actions/auth';
import { FormError } from '@/components/form/FormError';
import FormInputIcon, {
    RegisterPasswordInputIcon
} from '@/components/form/FormInputIcon';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { AuthSubmitButton } from '@/components/form/Buttons';

export function RegisterClient() {
    const [state, action] = useFormState(register, null);

    return (
        <form action={action} className="mt-8 space-y-6">
            <div className="relative grid grid-cols-2 gap-4">
                <div>
                    <FormInputIcon
                        label="First Name"
                        name="firstName"
                        type="text"
                        defaultValue=""
                    />
                </div>
                <div>
                    <FormInputIcon
                        label="Last Name"
                        name="lastName"
                        type="text"
                        defaultValue=""
                    />
                </div>
            </div>
            <div className="relative">
                <FormInputIcon
                    label="Email"
                    name="email"
                    type="text"
                    defaultValue=""
                />
            </div>
            <FormError value={state?.errors.email} />
            <div className="relative">
                <RegisterPasswordInputIcon />
            </div>
            <FormError value={state?.errors.password} />
            <div>
                <AuthSubmitButton text="Register" />
            </div>
        </form>
    );
}
