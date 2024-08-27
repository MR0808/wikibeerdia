'use client';

import Link from 'next/link';

import AuthWrapper from './AuthWrapper';
import { FormInputIcon } from '@/components/form/FormInputIcon';
import CheckboxInput from '@/components/form/CheckboxInput';
import { AuthSubmitButton } from '@/components/form/Buttons';

const LoginForm = () => {
    return (
        <AuthWrapper
            paragraph="How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around."
            heading="Welcome Back!"
            subHeading="Use the form below to log in to your account"
            backButtonString="Don't have an account yet?"
            backButtonHref="/register"
            backButtonLabel="Register"
        >
            <form className="mt-8 space-y-6">
                <input type="hidden" name="callbackUrl" value="placeholder" />
                <div className="relative">
                    <FormInputIcon
                        label="Email"
                        name="email"
                        type="text"
                        defaultValue=""
                    />
                </div>
                <div className="relative">
                    <FormInputIcon
                        label="Password"
                        name="password"
                        type="password"
                        defaultValue=""
                    />
                </div>
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
                    <AuthSubmitButton text="Login" isPending={true} />
                </div>
            </form>
        </AuthWrapper>
    );
};
export default LoginForm;
