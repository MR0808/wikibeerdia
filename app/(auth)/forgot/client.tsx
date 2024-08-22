'use client';

import { FormError } from '@/components/form/FormError';
import FormInputIcon from '@/components/form/FormInputIcon';
import { useFormState } from 'react-dom';
import { verifyEmail } from '@/actions/auth';
import { AuthSubmitButton } from '@/components/form/Buttons';

export function ForgotClient() {
    const [state, action] = useFormState(verifyEmail, null);

    return (
        <form action={action} className="mt-8 space-y-6">
            <div className="relative">
                <FormInputIcon
                    label="Email"
                    name="email"
                    type="text"
                    defaultValue=""
                />
            </div>
            <FormError value={state?.errors.email} />
            <div>
                <AuthSubmitButton text="Send verification" />
            </div>
        </form>
    );
}
