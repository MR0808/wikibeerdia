'use client';

import { useState, useRef, useEffect } from 'react';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { MdOutlinePhotoCamera } from 'react-icons/md';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { updateProfilePicture } from '@/actions/personalInfo';
import Image from 'next/image';
import profile from '@/public/images/profile.jpg';
import { Input } from '@/components/ui/input';
import { ProfileButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';

const ProfilePictureForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const { data: newSession, update } = useSession();
    const [newImage, setNewImage] = useState(false);
    const ref = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | undefined>(user?.image);

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setNewImage(true);
        }
    };

    function handleDataFromChild(data: string) {
        setNewImage(false);
    }

    const handleClick = () => {
        ref?.current?.click();
    };

    const removeImage = () => {
        setImage(user?.image);
        setNewImage(false);
        if (ref.current) ref.current.value = '';
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
                    <FormContainer
                        action={updateProfilePicture}
                        sendDataToParent={handleDataFromChild}
                    >
                        <div className="flex flex-col justify-center items-center">
                            <div className="w-[120px] h-[120px] max-h-[120px] max-w-[120px] border-2 border-solid border-white rounded-full shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] relative">
                                <Image
                                    src={image || profile}
                                    alt={`${user?.firstName} ${user?.lastName}}`}
                                    fill
                                    className={cn('w-full rounded-full')}
                                />
                                {!user?.isOAuth && (
                                    <>
                                        <div
                                            className="flex w-8 h-8 leading-7 text-xs border border-[#585C5480] border-solid bg-white absolute text-black rounded-full items-center justify-center right-0 bottom-0 cursor-pointer hover:bg-primary"
                                            onClick={handleClick}
                                        >
                                            <MdOutlinePhotoCamera className="w-4 h-4" />
                                        </div>

                                        <Input
                                            type="file"
                                            id="image"
                                            name="image"
                                            className="hidden"
                                            accept="image/*"
                                            ref={ref}
                                            onChange={(event) =>
                                                onImageChange(event)
                                            }
                                        />
                                    </>
                                )}
                            </div>
                            {!user?.isOAuth && (
                                <div className="mt-5 flex flex-col justify-center items-center">
                                    {newImage && (
                                        <div
                                            className="cursor-pointer hover:underline pb-2 text-sm text-gray-700"
                                            onClick={removeImage}
                                        >
                                            Remove
                                        </div>
                                    )}
                                    <div>
                                        <ProfileButton
                                            text="Save"
                                            newImage={newImage}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </FormContainer>
                </CardContent>
            </Card>
        </>
    );
};
export default ProfilePictureForm;
