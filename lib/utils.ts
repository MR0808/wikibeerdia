import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Status } from "@prisma/client";
import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
    MinusCircledIcon
} from "@radix-ui/react-icons";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export const getStatusIcon = (status: Status | undefined) => {
    const statusIcons = {
        REJECTED: CrossCircledIcon,
        APPROVED: CheckCircledIcon,
        PENDING: StopwatchIcon,
        DRAFT: QuestionMarkCircledIcon,
        DISABLED: MinusCircledIcon
    };

    return status ? statusIcons[status] : CircleIcon;
};

export const formatDate = (
    date: Date | string | number,
    opts: Intl.DateTimeFormatOptions = {}
) => {
    return new Intl.DateTimeFormat("en-US", {
        month: opts.month ?? "long",
        day: opts.day ?? "numeric",
        year: opts.year ?? "numeric",
        ...opts
    }).format(new Date(date));
};
