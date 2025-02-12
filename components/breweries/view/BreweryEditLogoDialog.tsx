"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    useState,
    useTransition,
    Dispatch,
    SetStateAction,
    useRef
} from "react";
import { toast } from "sonner";
import { uploadImage } from "@/utils/supabase";
import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerTrigger
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/FormError";
import { BreweryLogoSchema } from "@/schemas/brewery";
import { BreweryType } from "@/types/breweries";
import { updateBreweryLogo } from "@/actions/breweries";

interface BreweryEditLogoDialogProps {
    data: BreweryType;
}

interface LogoFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: BreweryType;
}

const BreweryEditLogoDialog = ({ data }: BreweryEditLogoDialogProps) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="mt-2 hover:underline">
                    Edit
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="border-b px-6 pt-8 pb-4">
                        <DialogTitle className="text-left text-3xl font-bold">
                            Update Logo
                        </DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <LogoForm setOpen={setOpen} data={data} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>Edit</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="mb-4 border-b px-6 pt-8 pb-4">
                    <DrawerTitle className="text-left text-2xl font-bold">
                        Add Review
                    </DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>
                <LogoForm setOpen={setOpen} data={data} />

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

const LogoForm = ({ setOpen, data }: LogoFormProps) => {
    const [error, setError] = useState<string | undefined>();
    const [newImage, setNewImage] = useState(false);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | undefined>(data?.logoUrl);
    const [isPending, startTransition] = useTransition();

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setNewImage(true);
        }
    };

    const removeImage = () => {
        setImage(data?.logoUrl);
        setNewImage(false);
        if (imageRef.current) imageRef.current.value = "";
    };

    const form = useForm<z.infer<typeof BreweryLogoSchema>>({
        resolver: zodResolver(BreweryLogoSchema)
    });

    const { ref, ...fileRef } = form.register("logoUrl");

    const handleClick = () => {
        imageRef.current?.click();
    };

    const onSubmit = (values: z.infer<typeof BreweryLogoSchema>) => {
        startTransition(async () => {
            const logoUrl = await uploadImage(
                values.logoUrl[0],
                "logos-bucket"
            );
            if (!logoUrl) {
                setError("Error uploading logo");
            } else {
                const result = await updateBreweryLogo(
                    logoUrl.publicUrl,
                    data.id,
                    data.logoUrl
                );
                if (result.error) {
                    setError(result.error);
                } else {
                    toast.success("Logo updated");
                    setOpen(false);
                    form.reset();
                }
            }
        });
    };

    const errorClass = "pl-6";

    return (
        <Form {...form}>
            <FormError message={error} />
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row justify-center px-6">
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src={image!}
                            alt={data.name}
                            width={240}
                            height={240}
                        />
                        <div
                            className="mt-3 cursor-pointer pb-2 text-sm text-gray-700 hover:underline"
                            onClick={handleClick}
                        >
                            Update
                        </div>
                        {newImage && (
                            <div
                                className="cursor-pointer pb-2 text-sm text-gray-700 hover:underline"
                                onClick={removeImage}
                            >
                                Remove
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="logoUrl"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="shadcn"
                                                {...fileRef}
                                                onChange={(event) => {
                                                    fileRef.onChange(event);
                                                    onImageChange(event);
                                                }}
                                                className="hidden"
                                                accept="image/*"
                                                ref={(e) => {
                                                    ref(e);
                                                    imageRef.current = e; // you can still assign to ref
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="mt-auto flex flex-col gap-2 p-4 pt-2">
                    <SubmitButton
                        disabledCheck={newImage || isPending}
                        isPending={isPending}
                        className="w-full"
                    />
                </div>
            </form>
        </Form>
    );
};

export default BreweryEditLogoDialog;
