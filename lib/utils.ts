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

export const toSlug = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-')

export const getFilterUrl = ({
    params,
    category,
    tag,
    sort,
    price,
    rating,
    page,
    url
}: {
    params: {
        // q?: string
        // category?: string
        // tag?: string
        // price?: string
        // rating?: string
        sort?: string
        page?: string,
    }
    tag?: string
    category?: string
    sort?: string
    price?: string
    rating?: string
    page?: string
    url: string

}) => {
    const newParams = { ...params }
    // if (category) newParams.category = category
    // if (tag) newParams.tag = toSlug(tag)
    // if (price) newParams.price = price
    // if (rating) newParams.rating = rating
    if (page) newParams.page = page
    if (sort) newParams.sort = sort
    return `/${url}?${new URLSearchParams(newParams).toString()}`
}