'use client';

import Image from 'next/image';

import AuthHeader from './AuthHeader';
import AuthContainer from './AuthContainer';
import AuthBackButton from './AuthBackButton';
import OauthButtons from './OauthButtons';
import logo from '@/public/images/logo-black.png';

interface AuthWrapperProps {
    children: React.ReactNode;
    paragraph: string;
    heading: string;
    subHeading: string;
    backButtonString: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    showFooter?: boolean;
}

const AuthWrapper = ({
    children,
    paragraph,
    heading,
    subHeading,
    backButtonString,
    backButtonLabel,
    backButtonHref,
    showSocial,
    showFooter = true
}: AuthWrapperProps) => {
    return (
        <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                <AuthContainer paragraph={paragraph} />
                <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 lg:pr-44 sm:rounded-lg md:rounded-none bg-white ">
                    <div className="max-w-md w-full space-y-8 mr-10">
                        <Image
                            src={logo}
                            alt="Wikibeerdia logo"
                            className="object-cover mx-auto rounded-full w-60 sm:hidden"
                        />
                        <AuthHeader heading={heading} subHeading={subHeading} />
                        {children}
                        {showSocial && <OauthButtons />}
                        {showFooter && (
                            <AuthBackButton
                                backButtonString={backButtonString}
                                backButtonHref={backButtonHref}
                                backButtonLabel={backButtonLabel}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthWrapper;
