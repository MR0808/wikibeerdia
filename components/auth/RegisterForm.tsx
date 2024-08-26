'use client';

import Link from 'next/link';

import AuthWrapper from './AuthWrapper';
import {
    FormInputIcon,
    RegisterPasswordInputIcon
} from '@/components/form/FormInputIcon';
import { AuthSubmitButton } from '@/components/form/Buttons';

const RegisterForm = () => {
    return (
        <AuthWrapper
            paragraph="How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around."
            heading="Register Now!"
            subHeading="Use the form below to register your account"
            backButtonString="Already have an account?"
            backButtonHref="/login"
            backButtonLabel="Login"
        >
            <form className="mt-8 space-y-6">
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
                <div className="relative">
                    <RegisterPasswordInputIcon />
                </div>
                <div>
                    <AuthSubmitButton text="Register" />
                </div>
            </form>
        </AuthWrapper>
    );
};
export default RegisterForm;
