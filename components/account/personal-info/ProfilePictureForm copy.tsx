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
import FormContainer from '@/components/form/FormContainer';

const ProfilePictureForm = () => {
    const user = useCurrentUser();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const ref = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | undefined>(user?.image);

    const errorClass = 'pl-6';

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleClick = () => {
        ref?.current?.click();
    };

    const removeImage = () => {
        setImage(user?.image);
    };

    const form = useForm<z.infer<typeof ProfilePictureSchema>>({
        resolver: zodResolver(ProfilePictureSchema)
    });

    const { ref: registerRef, ...fileRef } = form.register('image');

    const onSubmit = (values: z.infer<typeof ProfilePictureSchema>) => {
        console.log(values);
        startTransition(() => {
            updateProfilePicture(values)
                .then((data) => {
                    console.log(data);
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        update();
                        setError(undefined);
                        form.reset(values);
                        toast.success('Profile picture successfully updated');
                    }
                })
                .catch((error) => {
                    setError('Something went wrong!');
                    console.log(error);
                });
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
                    <Form {...form}>
                        <form
                            className="space-y-6 w-full"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-[120px] h-[120px] max-h-[120px] max-w-[120px] border-2 border-solid border-white rounded-full shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] relative">
                                    <Image
                                        src={image || profile}
                                        alt={`${user?.firstName} ${user?.lastName}}`}
                                        fill
                                        className={cn('w-full rounded-full')}
                                    />
                                    <Label
                                        htmlFor="image"
                                        className="flex w-8 h-8 leading-7 text-xs border border-[#585C5480] border-solid bg-white absolute text-black rounded-full items-center justify-center right-0 bottom-0 cursor-pointer hover:bg-primary"
                                        onClick={handleClick}
                                    >
                                        <MdOutlinePhotoCamera className="w-4 h-4" />
                                    </Label>
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem className={cn('w-full')}>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        {...fileRef}
                                                        ref={(e) => {
                                                            registerRef(e);
                                                            ref.current = e;
                                                        }}
                                                        onChange={(event) => {
                                                            onImageChange(
                                                                event
                                                            );
                                                            field.onChange(
                                                                event.target
                                                                    ?.files?.[0] ??
                                                                    undefined
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage
                                                    className={errorClass}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormError message={error} />
                                </div>
                                <div className="mt-5 flex flex-col justify-center items-center">
                                    <div
                                        className="cursor-pointer hover:underline pb-2 text-sm text-gray-700"
                                        onClick={removeImage}
                                    >
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
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
};
export default ProfilePictureForm;
