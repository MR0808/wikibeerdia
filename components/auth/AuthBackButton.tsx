import Link from 'next/link';

interface AuthBackButtonProps {
    backButtonString: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const AuthBackButton = ({
    backButtonString,
    backButtonLabel,
    backButtonHref
}: AuthBackButtonProps) => {
    return (
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>{backButtonString}</span>
            <Link
                href={backButtonHref}
                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
            >
                {backButtonLabel}
            </Link>
        </p>
    );
};

export default AuthBackButton;
