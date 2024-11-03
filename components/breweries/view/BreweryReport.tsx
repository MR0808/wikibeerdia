"use client";

import { useState } from "react";

import AddReportDialog from "@/components/reports/ReportDialog";

const BreweryReport = ({ breweryId }: { breweryId: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddReportDialog
                open={open}
                setOpen={setOpen}
                id={breweryId}
                type="BREWERY"
            />
            <div
                className="mt-2 flex cursor-pointer items-center gap-1 hover:underline"
                onClick={() => setOpen(true)}
            >
                Report
            </div>
        </>
    );
};
export default BreweryReport;
