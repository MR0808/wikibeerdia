"use client";

import { useState, useRef, useEffect } from "react";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Camera } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { updateProfilePicture } from "@/actions/personalInfo";
import Image from "next/image";
import profile from "@/public/images/profile.jpg";
import { Input } from "@/components/ui/input";
import { ProfileButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

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
    if (ref.current) ref.current.value = "";
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
          <FormContainer
            action={updateProfilePicture}
            sendDataToParent={handleDataFromChild}
          >
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

                    <Input
                      type="file"
                      id="image"
                      name="image"
                      className="hidden"
                      accept="image/*"
                      ref={ref}
                      onChange={(event) => onImageChange(event)}
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
                    <ProfileButton text="Save" newImage={newImage} />
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
