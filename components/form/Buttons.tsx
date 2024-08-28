'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPenSquare } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
    className?: string;
    text?: string;
    size?: btnSize;
    isPending: boolean;
};

export const SubmitButton = ({
    className = '',
    text = 'submit',
    size = 'lg',
    isPending
}: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isPending}
            className={cn('capitalize', className)}
            size={size}
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                text
            )}
        </Button>
    );
};

export const AuthSubmitButton = ({
    className = '',
    text = 'submit',
    size = 'lg',
    isPending
}: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isPending}
            className={cn('capitalize w-full rounded-full h-12', className)}
            size={size}
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                text
            )}
        </Button>
    );
};

type actionType = 'edit' | 'delete';

export const IconButton = ({ actionType }: { actionType: actionType }) => {
    const pending = true;

    const renderIcon = () => {
        switch (actionType) {
            case 'edit':
                return <LuPenSquare />;
            case 'delete':
                return <LuTrash2 />;
            default:
                const never: never = actionType;
                throw new Error(`Invalid action type: ${never}`);
        }
    };

    return (
        <Button
            type="submit"
            size="icon"
            variant="link"
            className="p-2 cursor-pointer"
        >
            {pending ? <ReloadIcon className=" animate-spin" /> : renderIcon()}
        </Button>
    );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    const pending = true;
    return (
        <Button
            type="submit"
            size="icon"
            variant="outline"
            className=" p-2 cursor-pointer"
        >
            {pending ? (
                <ReloadIcon className=" animate-spin" />
            ) : isFavorite ? (
                <FaHeart />
            ) : (
                <FaRegHeart />
            )}
        </Button>
    );
};
