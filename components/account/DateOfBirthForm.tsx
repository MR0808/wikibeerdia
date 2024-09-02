'use client';

import * as z from 'zod';
import { format, sub } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from '@/components/form/DatePicker';

import { SubmitButton } from '@/components/form/Buttons';
import FormError from '@/components/form/FormError';
import { updateDateOfBirth } from '@/actions/personalInfo';
import { DateOfBirthSchema } from '@/schemas';
import { DateOfBirthProps } from '@/utils/types';
import { cn } from '@/lib/utils';

const DateOfBirthForm = ({ dateOfBirthProp }: DateOfBirthProps) => {
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [dateOfBirth, setDateOfBirth] = useState(dateOfBirthProp || undefined);
    const [date, setDate] = useState(sub(new Date(), {years:18}))

    const errorClass = 'pl-6';

    const form = useForm<z.infer<typeof DateOfBirthSchema>>({
        resolver: zodResolver(DateOfBirthSchema),
        defaultValues: {
            dateOfBirth: dateOfBirth || undefined
        }
    });

    const cancel = () => {
        form.reset();
        setEdit(!edit);
    };

    const onSubmit = (values: z.infer<typeof DateOfBirthSchema>) => {
        // startTransition(() => {
        //     updateDateOfBirth(values)
        //         .then((data) => {
        //             if (data?.error) {
        //                 setError(data.error);
        //             }
        //             if (data?.success) {
        //                 setEdit(false);
        //                 setDateOfBirth(values.dateOfBirth)
        //                 );
        //                 form.reset(values);
        //                 toast.success('Gender successfully updated');
        //             }
        //         })
        //         .catch(() => setError('Something went wrong!'));
        // });
    };

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8 mt-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Date of Birth</h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <Form {...form}>
                    <FormError message={error} />
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row gap-x-6">
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                                                        >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className=" w-auto p-0">
                                                    <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown-buttons"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    fromYear={1900}
                                                    toYear={date.getFullYear()}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPending} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div className={`${!dateOfBirth && 'italic'} text-base font-normal`}>
                    {dateOfBirth ? `${dateOfBirth}` : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default DateOfBirthForm;
