"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState, useEffect, useRef } from "react";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Camera } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { ProfilePictureSchema } from "@/schemas/personal-info";
import { updateProfilePicture } from "@/actions/personalInfo";
import Image from "next/image";
import profile from "@/public/images/profile.jpg";
import { Input } from "@/components/ui/input";
import { ProfileButton } from "@/components/form/Buttons";

const ProfilePictureForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const { data: newSession, update } = useSession();
    const [newImage, setNewImage] = useState(false);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | undefined>(user?.image);
    const [isPending, startTransition] = useTransition();

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

    const removeImage = () => {
        setImage(user?.image);
        setNewImage(false);
        if (imageRef.current) imageRef.current.value = "";
    };

    const form = useForm<z.infer<typeof ProfilePictureSchema>>({
        resolver: zodResolver(ProfilePictureSchema)
    });

    const { ref, ...fileRef } = form.register("image");

    const handleClick = () => {
        imageRef.current?.click();
    };

    const onSubmit = (values: z.infer<typeof ProfilePictureSchema>) => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("image", values.image[0]);

            updateProfilePicture(formData)
                .then((data) => {
                    if (!data?.result) {
                        toast.error(data.message);
                    }

                    if (data?.result) {
                        update();
                        form.reset(values);
                        toast.success("Profile picture successfully updated");
                    }
                })
                .catch(() => toast.error("Something went wrong!"));
        });
    };

    return (
        <>
            <Card className="mb-6 w-80 sm:w-[400px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-row justify-center">
                            <div className="items-center text-xl font-semibold">
                                Profile Picture
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative h-[120px] max-h-[120px] w-[120px] max-w-[120px] rounded-full border-2 border-solid border-white shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)]">
                                    <Image
                                        src={image || profile}
                                        alt={`${user?.firstName} ${user?.lastName}}`}
                                        fill
                                        className={cn("w-full rounded-full")}
                                    />
                                    {!user?.isOAuth && (
                                        <>
                                            <div
                                                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-solid border-[#585C5480] bg-white text-xs leading-7 text-black hover:bg-primary"
                                                onClick={handleClick}
                                            >
                                                <Camera className="h-4 w-4" />
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="file"
                                                                    placeholder="shadcn"
                                                                    {...fileRef}
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        fileRef.onChange(
                                                                            event
                                                                        );
                                                                        onImageChange(
                                                                            event
                                                                        );
                                                                    }}
                                                                    className="hidden"
                                                                    accept="image/*"
                                                                    ref={(
                                                                        e
                                                                    ) => {
                                                                        ref(e);
                                                                        imageRef.current =
                                                                            e; // you can still assign to ref
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                                {!user?.isOAuth && (
                                    <div className="mt-5 flex flex-col items-center justify-center">
                                        {newImage && (
                                            <div
                                                className="cursor-pointer pb-2 text-sm text-gray-700 hover:underline"
                                                onClick={removeImage}
                                            >
                                                Remove
                                            </div>
                                        )}
                                        <div>
                                            <ProfileButton
                                                text="Save"
                                                newImage={newImage}
                                                isPending={isPending}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
};
export default ProfilePictureForm;
