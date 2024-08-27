'use client';

import Link from 'next/link';

import AuthWrapper from './AuthWrapper';
import { FormInputIcon } from '@/components/form/FormInputIcon';
import CheckboxInput from '@/components/form/CheckboxInput';
import { AuthSubmitButton } from '@/components/form/Buttons';

const ForgotForm = () => {
    return (
        <AuthWrapper
            paragraph="We've all done it, a few too many beers, and forgotten our password. That's fine, we don't care, just use this page to get it back and start again."
            heading="Forgotten your password?"
            subHeading="Use the form below to reset it"
            backButtonString="Remember your password?"
            backButtonHref="/login"
            backButtonLabel="Login"
        >
            <form className="mt-8 space-y-6">
                <div className="relative">
                    <FormInputIcon
                        label="Email"
                        name="email"
                        type="text"
                        defaultValue=""
                    />
                </div>
                <div>
                    <AuthSubmitButton text="Send verification" isPending={true} />
                </div>
            </form>
        </AuthWrapper>
    );
};
export default ForgotForm;
