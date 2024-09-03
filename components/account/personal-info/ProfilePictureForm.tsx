'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState, useRef } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { MdOutlinePhotoCamera } from 'react-icons/md';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import useCurrentUser from '@/hooks/useCurrentUser';
import FormError from '@/components/form/FormError';
import { ProfilePictureSchema } from '@/schemas';
import { cn } from '@/lib/utils';
import { updateProfilePicture } from '@/actions/personalInfo';
import Image from 'next/image';
import profile from '@/public/images/profile.jpg';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/form/Buttons';

const ProfilePictureForm = () => {
    const user = useCurrentUser();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const ref = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        ref?.current?.click();
    };

    const onSubmit = (values: z.infer<typeof ProfilePictureSchema>) => {
        startTransition(() => {
            // updateName(values)
            //     .then((data) => {
            //         if (data?.error) {
            //             setError(data.error);
            //         }
            //         if (data?.success) {
            //             setEdit(false);
            //             update();
            //             form.reset(values);
            //             toast.success('Name successfully updated');
            //         }
            //     })
            //     .catch(() => setError('Something went wrong!'));
        });
    };

    return (
        <>
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-row justify-center">
                            <div className="text-xl font-semibold items-center">
                                Profile Picture
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-[120px] h-[120px] border-2 border-solid border-white rounded-full shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] relative">
                            <Image
                                src={user?.image || profile}
                                alt={`${user?.firstName} ${user?.lastName}}`}
                                className={cn('w-full rounded-full')}
                            />
                            <Label
                                htmlFor="image"
                                className="flex w-8 h-8 leading-7 text-xs border border-[#585C5480] border-solid bg-white absolute text-black rounded-full items-center justify-center right-0 bottom-0 cursor-pointer hover:bg-primary"
                                onClick={handleClick}
                            >
                                <MdOutlinePhotoCamera className="w-4 h-4" />
                            </Label>

                            <Input
                                ref={ref}
                                type="file"
                                name="image"
                                className="hidden"
                            />
                        </div>
                        <div className="mt-5 flex flex-col justify-center items-center">
                            <div className="cursor-pointer hover:underline pb-2 text-sm text-gray-700">
                                Remove
                            </div>
                            <div>
                                <SubmitButton
                                    text="save"
                                    isPending={isPending}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
export default ProfilePictureForm;
