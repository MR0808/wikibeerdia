"use client";

import { useState } from "react";

import AddReportDialog from "@/components/reports/ReportDialog";

const BeerReport = ({ beerId }: { beerId: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddReportDialog
                open={open}
                setOpen={setOpen}
                id={beerId}
                type="BEER"
            />
            <div
                className="mt-2 flex cursor-pointer items-center justify-center gap-1 hover:underline"
                onClick={() => setOpen(true)}
            >
                Report / Request changes
            </div>
        </>
    );
};
export default BeerReport;
