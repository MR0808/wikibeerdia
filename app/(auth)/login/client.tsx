'use client';

import { FormError } from '@/components/form/FormError';
import FormInputIcon from '@/components/form/FormInputIcon';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '@/actions/auth';
import CheckboxInput from '@/components/form/CheckboxInput';
import { AuthSubmitButton } from '@/components/form/Buttons';

export function LoginClient({ callbackUrl }: { callbackUrl: string }) {
    const [state, action] = useFormState(login, null);

    return (
        <form action={action} className="mt-8 space-y-6">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
                <FormInputIcon
                    label="Password"
                    name="password"
                    type="password"
                    defaultValue=""
                />
            </div>
            <FormError value={state?.errors.password} />
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <CheckboxInput
                        label="Remember Me"
                        name="rememberMe"
                        defaultChecked={true}
                    />
                </div>
                <div className="text-sm">
                    <Link
                        href="/forgot"
                        className="text-indigo-400 hover:text-blue-500"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
            <div>
                <AuthSubmitButton text="Login" />
            </div>
        </form>
    );
}
