'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TwoFactorForm = ({
    session,
    isTwoFactorEnabled
}: {
    session: Session | null;
    isTwoFactorEnabled: boolean;
}) => {
    const [user, setUser] = useState(session?.user);
    const [twoFactor, setTwoFactor] = useState(isTwoFactorEnabled);
    const [openModal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const { data: newSession, update } = useSession();

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    const cancel = () => {
        setEdit(!edit);
    };

    const handleModal = () => {
        setModal(!openModal);
    };

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8 mt-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">
                    Two Factor Authentication
                </h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <>
                    <Button
                        type="button"
                        className="h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900"
                        onClick={handleModal}
                    >
                        Open Modal
                    </Button>
                    {openModal && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center">
                            <div className="max-w-[460px] bg-white shadow-lg py-2 rounded-md">
                                <h2 className="text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4">
                                    This is my modal.
                                </h2>
                                <div className="px-4 pb-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Et quod quis eaque
                                        aliquam necessitatibus vel eligendi
                                        laboriosam optio quisquam sunt.
                                    </p>
                                </div>
                                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                                    <div className="text-sm font-medium text-gray-700">
                                        Example Content
                                    </div>
                                    <button
                                        type="button"
                                        className="h-8 px-2 text-sm rounded-md bg-gray-700 text-white"
                                        onClick={handleModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div>{twoFactor ? 'Enabled' : 'Disabled'}</div>
            )}
        </div>
    );
};
export default TwoFactorForm;
