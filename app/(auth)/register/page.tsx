import AuthContainer from '@/components/auth/AuthContainer';
import Link from 'next/link';
import { RegisterClient } from './client';

export default function LoginPage() {
    const paragraph =
        'How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around.';

    return (
        <>
            <div className="relative min-h-screen flex ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                    <AuthContainer paragraph={paragraph} />
                    <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 lg:pr-44 sm:rounded-lg md:rounded-none bg-white ">
                        <div className="max-w-md w-full space-y-8 mr-10">
                            <div className="text-center">
                                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                    Register Now!
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Use the form below to register your account
                                </p>
                            </div>
                            <RegisterClient />
                            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                                <span>Already have an account?</span>
                                <Link
                                    href="/login"
                                    className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
