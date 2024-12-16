"use client";

import { Ellipsis, Watch } from "lucide-react";
import { useTransition } from "react";
import { Status } from "@prisma/client";
import { toast } from "sonner";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { updateBeerStatus } from "@/actions/beers";

const BeerAdminMenu = ({ id, status }: { id: string; status: Status }) => {
    const [isPending, startTransition] = useTransition();

    const updateStatus = async (status: Status) => {
        startTransition(() => {
            updateBeerStatus(id, status)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error);
                    } else {
                        toast.success("Status updated");
                    }
                })
                .catch((error) => toast.error(error));
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:bg-primary hover:text-white">
                    {isPending ? <Watch /> : <Ellipsis />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
                <DropdownMenuLabel>Brewery Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {status === "PENDING" && (
                    <>
                        <DropdownMenuItem>
                            <div onClick={() => updateStatus("APPROVED")}>
                                Approve
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div onClick={() => updateStatus("REJECTED")}>
                                Reject
                            </div>
                        </DropdownMenuItem>
                    </>
                )}
                {status === "APPROVED" && (
                    <DropdownMenuItem>
                        <div onClick={() => updateStatus("DISABLED")}>
                            Disable
                        </div>
                    </DropdownMenuItem>
                )}
                {status === "DISABLED" && (
                    <DropdownMenuItem>
                        <div onClick={() => updateStatus("APPROVED")}>
                            Enable
                        </div>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                    <Link href={`/beers/edit/${id}`}>Edit</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default BeerAdminMenu;
