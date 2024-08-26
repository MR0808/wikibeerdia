'use client';

import AuthHeader from './AuthHeader';
import AuthContainer from './AuthContainer';
import AuthBackButton from './AuthBackButton';

interface AuthWrapperProps {
    children: React.ReactNode;
    paragraph: string;
    heading: string;
    subHeading: string;
    backButtonString: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const AuthWrapper = ({
    children,
    paragraph,
    heading,
    subHeading,
    backButtonString,
    backButtonLabel,
    backButtonHref,
    showSocial
}: AuthWrapperProps) => {
    return (
        <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                <AuthContainer paragraph={paragraph} />
                <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 lg:pr-44 sm:rounded-lg md:rounded-none bg-white ">
                    <div className="max-w-md w-full space-y-8 mr-10">
                        <AuthHeader heading={heading} subHeading={subHeading} />
                        {children}
                        <AuthBackButton
                            backButtonString={backButtonString}
                            backButtonHref={backButtonHref}
                            backButtonLabel={backButtonLabel}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthWrapper;
